// Configuration constants
const CONFIG = {
  DEBOUNCE_DELAY: 500, // ms to wait before triggering detectMathContent
  API_TIMEOUT: 10000, // 10 seconds timeout for API calls
  DRAG_THRESHOLD: 5, // pixels to distinguish drag from click
  STORAGE_KEY_REMINDER_DISMISSED: 'reminderDismissed',
  WOLFRAM_APP_ID: 'EVEKW57V7X'
};

// Debounce utility function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

(function () {
  if (document.getElementById('smart-mathcalc-container')) return;

  const container = document.createElement('div');
  container.id = 'smart-mathcalc-container';
  container.innerHTML = `
    <div id="mathcalc-popup" class="smc-popup" style="display: none;">
      <div class="smc-popup-header">
        <span class="smc-popup-title">📐 Smart MathCalc</span>
        <span class="smc-popup-close" id="popup-close">✕</span>
      </div>
      <div class="smc-popup-body">
        <input type="text" id="calc-input" class="smc-calc-input" placeholder="Expression..." />
        <div id="button-grid" class="smc-button-grid"></div>
      </div>
    </div>
  <div id="mathcalc-reminder" class="smc-reminder" style="display: none;">
    <div class="smc-reminder-inner">
      <span class="smc-reminder-text">🧮 Need help with math?</span>
      <span class="smc-reminder-close" id="reminder-close">✕</span>
    </div>
  </div>
  `;
  document.body.appendChild(container);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = chrome.runtime.getURL('styles.css');
  document.head.appendChild(style);

  initCalculator();

  // Load reminder dismissed state from storage
  chrome.storage.local.get([CONFIG.STORAGE_KEY_REMINDER_DISMISSED], (result) => {
    if (result[CONFIG.STORAGE_KEY_REMINDER_DISMISSED]) {
      document.getElementById('mathcalc-reminder').style.display = 'none';
    }
  });

  document.getElementById('reminder-close').onclick = (event) => {
    event.stopPropagation();
    document.getElementById('mathcalc-reminder').style.display = 'none';
    // Save dismissed state
    chrome.storage.local.set({ [CONFIG.STORAGE_KEY_REMINDER_DISMISSED]: true });
  };

  makeDraggable(document.getElementById('mathcalc-reminder'), '.smc-reminder-inner');

  document.getElementById('popup-close').onclick = () => {
    document.getElementById('mathcalc-popup').style.display = 'none';
  };

  document.getElementById('mathcalc-reminder').onclick = () => {
    const reminder = document.getElementById('mathcalc-reminder');
    // Only skip if actually dragged (not just clicked)
    if (reminder.dataset.wasDragged === "true") {
      reminder.dataset.wasDragged = "false";
      return;
    }
    document.getElementById('mathcalc-popup').style.display = 'block';
  };

  makeDraggable(document.getElementById('mathcalc-popup'));

  detectMathContent();

  // Use debounced version to reduce performance impact
  const debouncedDetect = debounce(detectMathContent, CONFIG.DEBOUNCE_DELAY);
  
  const observer = new MutationObserver((mutationsList, observer) => {
    debouncedDetect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();

function detectMathContent() {
  // Improved regex to reduce false positives (e.g., avoiding simple prices like "2+1")
  const mathRegex = /\d+\s*[+\-×÷*/^=√]\s*\d+|\d+√[a-zA-Z]|\d+\(|∫|lim|d\/dx|f\([a-z]\)|\\frac|\\int|\\sum/i;
  
  // More targeted selectors, excluding navigation and headers
  const blocks = Array.from(document.querySelectorAll('p, pre, code, article, main, .content, [class*="math"]'))
    .slice(0, 100) // Limit to first 100 elements for performance
    .map(n => n.innerText || '')
    .filter(Boolean);
  
  const found = blocks.some(t => mathRegex.test(t));
  const reminder = document.getElementById('mathcalc-reminder');
  if (reminder) {
    // Check if reminder was dismissed
    chrome.storage.local.get([CONFIG.STORAGE_KEY_REMINDER_DISMISSED], (result) => {
      if (!result[CONFIG.STORAGE_KEY_REMINDER_DISMISSED]) {
        reminder.style.display = found ? 'block' : 'none';
      }
    });
  }
}

function initCalculator() {
  const buttons = [
    "Rad", "Deg", "!", "(", ")", "%", "AC",
    "Inv", "sin", "ln", "7", "8", "9", "÷",
    "π", "cos", "log", "4", "5", "6", "×",
    "e", "tan", "√", "1", "2", "3", "−",
    "Ans", "EXP", "^", "0", ".", "=", "+",
    "∫", "d/dx", "lim", "x", "y", "d", "C"
  ];
  const grid = document.getElementById('button-grid');
  buttons.forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'smc-calc-btn';
    btn.textContent = label;
    btn.onclick = () => handleInput(label);
    grid.appendChild(btn);
  });
}

function handleInput(label) {
  const input = document.getElementById('calc-input');
  
  // Operation mapping table for special buttons
  const operations = {
    'AC': () => { input.value = ''; },
    'C': () => { input.value = input.value.slice(0, -1); },
    '=': () => {
      if (!input.value.trim()) {
        input.value = 'Error: Empty input';
        return;
      }
      
      // Show loading state
      const originalValue = input.value;
      input.value = 'Calculating...';
      input.disabled = true;
      
      chrome.runtime.sendMessage(
        { type: 'wolframQuery', input: originalValue },
        response => {
          input.disabled = false;
          if (response && response.result) {
            input.value = response.result;
          } else {
            input.value = 'Error: No response';
          }
        }
      );
    },
    // Smart template buttons - wrap existing content or provide template
    '∫': () => {
      if (input.value.trim()) {
        input.value = `integrate(${input.value})`;
      } else {
        input.value = 'integrate( , x)';
      }
    },
    'd/dx': () => {
      if (input.value.trim()) {
        input.value = `d/dx(${input.value})`;
      } else {
        input.value = 'd/dx( )';
      }
    },
    'lim': () => {
      if (input.value.trim()) {
        input.value = `limit(${input.value}, x->0)`;
      } else {
        input.value = 'limit( , x->0)';
      }
    }
  };
  
  // Execute operation if defined, otherwise append label
  if (operations[label]) {
    operations[label]();
  } else {
    input.value += label;
  }
}

function makeDraggable(elmnt, dragSelector) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  let hasMoved = false;
  let startX = 0, startY = 0;

  const header = dragSelector
    ? elmnt.querySelector(dragSelector)
    : elmnt.querySelector('.smc-popup-header') || elmnt;

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    isDragging = false;
    hasMoved = false;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    // Only start dragging if moved beyond threshold
    if (Math.abs(dx) > CONFIG.DRAG_THRESHOLD || Math.abs(dy) > CONFIG.DRAG_THRESHOLD) {
      isDragging = true;
      hasMoved = true;
    }

    // Only update position if dragging
    if (isDragging) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      let newTop = elmnt.offsetTop - pos2;
      let newLeft = elmnt.offsetLeft - pos1;

      newTop = Math.max(0, Math.min(window.innerHeight - elmnt.offsetHeight, newTop));
      newLeft = Math.max(0, Math.min(window.innerWidth - elmnt.offsetWidth, newLeft));

      elmnt.style.top = newTop + "px";
      elmnt.style.left = newLeft + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    // Only mark as dragged if actually moved
    elmnt.dataset.wasDragged = hasMoved ? "true" : "false";
  }
}

async function evaluateExpression(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://api.wolframalpha.com/v1/result?i=${encoded}&appid=${CONFIG.WOLFRAM_APP_ID}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);
    
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      return `Error: Server returned ${res.status}`;
    }
    
    const result = await res.text();
    return result || "Error: Empty response";
  } catch (error) {
    if (error.name === 'AbortError') {
      return "Error: Request timeout";
    }
    return `Error: ${error.message}`;
  }
}
