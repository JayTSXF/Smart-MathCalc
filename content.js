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
      🧮 Need help with math? Click here!
    </div>
  `;
  document.body.appendChild(container);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = chrome.runtime.getURL('styles.css');
  document.head.appendChild(style);

  initCalculator();

  document.getElementById('popup-close').onclick = () => {
    document.getElementById('mathcalc-popup').style.display = 'none';
  };

  document.getElementById('mathcalc-reminder').onclick = () => {
    document.getElementById('mathcalc-popup').style.display = 'block';
  };

  makeDraggable(document.getElementById('mathcalc-popup'));

  setInterval(detectMathContent, 2000);
})();

// 检测页面中是否有数学表达式
function detectMathContent() {
  const mathRegex = /[0-9]+\s*[+\-×÷*/^=]\s*[0-9]+|∫|√|lim|dx|=|f\([a-z]\)|\b(sin|cos|tan|log|ln)\b/i;
  const blocks = Array.from(document.querySelectorAll('p, span, div, code, h1, h2, h3')).map(n => n.innerText || '').filter(Boolean);
  const found = blocks.some(t => mathRegex.test(t));
  const reminder = document.getElementById('mathcalc-reminder');
  if (reminder) {
    reminder.style.display = found ? 'block' : 'none';
  }
}

// 初始化计算器按钮
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

// 输入逻辑处理
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

// 拖动计算器窗口
function makeDraggable(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = elmnt.querySelector('.popup-header');
  if (!header) return;
  header.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX; pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
    pos3 = e.clientX; pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// 调用 WolframAlpha Short Answer API
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