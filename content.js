(function () {
  if (document.getElementById('smart-mathcalc-container')) return;

  const container = document.createElement('div');
  container.id = 'smart-mathcalc-container';
  container.innerHTML = `
    <div id="mathcalc-popup" class="popup" style="display: none;">
      <div class="popup-header">
        <span class="popup-title">📐 Smart MathCalc</span>
        <span class="popup-close" id="popup-close">✕</span>
      </div>
      <div class="popup-body">
        <input type="text" id="calc-input" placeholder="Expression..." />
        <div id="button-grid"></div>
      </div>
    </div>
  <div id="mathcalc-reminder" class="reminder" style="display: none;">
    <div class="reminder-inner">
      <span class="reminder-text">🧮 Need help with math?</span>
      <span class="reminder-close" id="reminder-close">✕</span>
    </div>
  </div>
  `;
  document.body.appendChild(container);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = chrome.runtime.getURL('styles.css');
  document.head.appendChild(style);

  initCalculator();

  document.getElementById('reminder-close').onclick = (event) => {
    event.stopPropagation();
    document.getElementById('mathcalc-reminder').style.display = 'none';
  };

  makeDraggable(document.getElementById('mathcalc-reminder'), '.reminder-inner');

  document.getElementById('popup-close').onclick = () => {
    document.getElementById('mathcalc-popup').style.display = 'none';
  };

  document.getElementById('mathcalc-reminder').onclick = () => {
    const reminder = document.getElementById('mathcalc-reminder');
    if (reminder.dataset.wasDragged === "true") {
      reminder.dataset.wasDragged = "false";
      console.log("[DEBUG] Reminder was dragged, skipping popup this time.");
      return;
    }
    document.getElementById('mathcalc-popup').style.display = 'block';
  };

  makeDraggable(document.getElementById('mathcalc-popup'));

  detectMathContent();

  const observer = new MutationObserver((mutationsList, observer) => {
    detectMathContent();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();

function detectMathContent() {
  const mathRegex = /\d[+\-×÷*/^=√]\d|\d√[a-zA-Z]|\d\(|∫|lim|d\/dx|f\([a-z]\)/i;
  const blocks = Array.from(document.querySelectorAll('p, span, div, code, h1, h2, h3')).map(n => n.innerText || '').filter(Boolean);
  const found = blocks.some(t => mathRegex.test(t));
  const reminder = document.getElementById('mathcalc-reminder');
  if (reminder) {
    reminder.style.display = found ? 'block' : 'none';
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
    btn.className = 'calc-btn';
    btn.textContent = label;
    btn.onclick = () => handleInput(label);
    grid.appendChild(btn);
  });
}

function handleInput(label) {
  const input = document.getElementById('calc-input');

  if (label === "AC") {
    input.value = '';
  } else if (label === "C") {
    input.value = input.value.slice(0, -1);
  } else if (label === "=") {
    chrome.runtime.sendMessage(
      { type: 'wolframQuery', input: input.value },
      response => {
        input.value = response.result;
      }
    );
  } else {
    input.value += label;
  }
}

function makeDraggable(elmnt, dragSelector) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  let startX = 0, startY = 0;

  const header = dragSelector
    ? elmnt.querySelector(dragSelector)
    : elmnt.querySelector('.popup-header') || elmnt;

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    isDragging = false;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      isDragging = true;
    }

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

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.dataset.wasDragged = isDragging ? "true" : "false";
  }
}

async function evaluateExpression(query) {
  const appid = "EVEKW57V7X";
  const encoded = encodeURIComponent(query);
  const url = `https://api.wolframalpha.com/v1/result?i=${encoded}&appid=${appid}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return "Error";
    return await res.text();
  } catch {
    return "Error";
  }
}
