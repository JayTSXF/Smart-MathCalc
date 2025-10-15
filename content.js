const CONFIG = {
  DEBOUNCE_DELAY: 500,
  DRAG_THRESHOLD: 5,
  MAX_ELEMENTS_TO_CHECK: 200
};

const buttonLayout = [
  { label: "7", tip: "Number 7" },
  { label: "8", tip: "Number 8" },
  { label: "9", tip: "Number 9" },
  { label: "÷", tip: "Division" },
  { label: "(", tip: "Left parenthesis" },
  { label: ")", tip: "Right parenthesis" },
  { label: "π", tip: "Pi ≈ 3.14159" },
  { label: "e", tip: "Euler's number ≈ 2.71828" },
  
  { label: "4", tip: "Number 4" },
  { label: "5", tip: "Number 5" },
  { label: "6", tip: "Number 6" },
  { label: "×", tip: "Multiplication" },
  { label: "[", tip: "Left bracket" },
  { label: "]", tip: "Right bracket" },
  { label: "sin", tip: "Sine Function\n\nsin(x)\nsin(pi/2) = 1" },
  { label: "cos", tip: "Cosine Function\n\ncos(x)\ncos(0) = 1" },
  
  { label: "1", tip: "Number 1" },
  { label: "2", tip: "Number 2" },
  { label: "3", tip: "Number 3" },
  { label: "−", tip: "Subtraction" },
  { label: "{", tip: "Left brace" },
  { label: "}", tip: "Right brace" },
  { label: "tan", tip: "Tangent Function\n\ntan(x)\ntan(pi/4) = 1" },
  { label: "ln", tip: "Natural Logarithm\n\nln(x)\nln(e) = 1" },

  { label: "0", tip: "Number 0" },
  { label: ".", tip: "Decimal point" },
  { label: ",", tip: "Comma separator" },
  { label: "+", tip: "Addition" },
  { label: "^", tip: "Power\n\nx^n\n2^3 = 8" },
  { label: "√", tip: "Square Root\n\nsqrt(x)\nsqrt(16) = 4" },
  { label: "log", tip: "Logarithm\n\nlog(x)\nlog(100) = 2" },
  { label: "abs", tip: "Absolute Value\n\nabs(x)\nabs(-5) = 5" },
  
  { label: "x", tip: "Variable x" },
  { label: "y", tip: "Variable y" },
  { label: "z", tip: "Variable z" },
  { label: "i", tip: "Imaginary unit" },
  { label: "∞", tip: "Infinity" },
  { label: "!", tip: "Factorial\n\nn!\n5! = 120" },
  { label: "C", tip: "Clear last character" },
  { label: "AC", tip: "Clear all" },
  
  { label: "d/dx", tip: "Derivative\n\nderivative of expression\nderivative of x^2 = 2x" },
  { label: "d²/dx²", tip: "Second Derivative\n\nsecond derivative of expression\nsecond derivative of x^3 = 6x" },
  { label: "∫", tip: "Integral\n\nintegral of expression\nintegral of x^2 = x^3/3" },
  { label: "lim", tip: "Limit\n\nlimit of expression as x approaches value\nlimit of sin(x)/x as x->0 = 1" },
  { label: "∂x", tip: "Partial Derivative (x)\n\npartial derivative of expression with respect to x" },
  { label: "∂y", tip: "Partial Derivative (y)\n\npartial derivative of expression with respect to y" },
  { label: "taylor", tip: "Taylor Series\n\ntaylor series expression\ntaylor series sin(x)" },
  { label: "solve", tip: "Solve Equation\n\nsolve equation=0\nsolve x^2+2x+1=0" },
  
  { label: "matrix", tip: "Matrix Template\n\n{{row1},{row2}}\n{{1,2},{3,4}}" },
  { label: "det", tip: "Determinant\n\ndeterminant {{matrix}}\ndeterminant {{1,2},{3,4}} = -2" },
  { label: "inv", tip: "Matrix Inverse\n\ninverse {{matrix}}\ninverse {{2,1},{1,2}}" },
  { label: "eigenval", tip: "Eigenvalues\n\neigenvalues {{matrix}}\neigenvalues {{1,2},{3,4}}" },
  { label: "eigenvec", tip: "Eigenvectors\n\neigenvectors {{matrix}}\neigenvectors {{1,2},{3,4}}" },
  { label: "transpose", tip: "Transpose\n\ntranspose {{matrix}}\ntranspose {{1,2},{3,4}}" },
  { label: "rank", tip: "Matrix Rank\n\nrank {{matrix}}\nrank {{1,2},{3,4}} = 2" },
  { label: "rref", tip: "Row Echelon Form\n\nrow reduce {{matrix}}\nrow reduce {{1,2,3},{4,5,6}}" },
  
  { label: "vector", tip: "Vector Template\n\n{elements}\n{1,2,3}" },
  { label: "dot", tip: "Dot Product\n\nvector1 . vector2\n{1,2,3} . {4,5,6} = 32" },
  { label: "cross", tip: "Cross Product\n\nvector1 x vector2\n{1,0,0} x {0,1,0} = {0,0,1}" },
  { label: "norm", tip: "Vector Magnitude\n\nnorm {vector}\nnorm {3,4} = 5" },
  { label: "∑", tip: "Sum\n\nsum expression, variable=start to end\nsum k, k=1 to 10 = 55" },
  { label: "expand", tip: "Expand Expression\n\nexpand (x+1)^2\nexpand (x+1)^2 = x^2+2x+1" },
  { label: "factor", tip: "Factor Expression\n\nfactor x^2-1\nfactor x^2-1 = (x-1)(x+1)" },
  { label: "Ans", tip: "Previous answer" },
  
  { label: "=", tip: "Calculate", special: true, centered: true }
];

function isMatrixOrVector(input) {
  const trimmed = input.trim();
  return /^\{\{.*\}\}$/.test(trimmed) || /^\{[^{}]+\}$/.test(trimmed);
}

function hasMatrixOrVector(input) {
  return /\{\{.*\}\}/.test(input) || /\{[^{}]+\}/.test(input);
}

function hasFunction(input) {
  const functions = ['solve', 'derivative', 'integral', 'limit', 'taylor', 'expand', 'factor', 'simplify', 
                     'determinant', 'eigenvalues', 'eigenvectors', 'inverse', 'transpose', 'rank', 'norm',
                     'row reduce', 'partial derivative', 'second derivative'];
  return functions.some(func => input.toLowerCase().includes(func));
}

function getSmartOperation(label, input, cursorPos) {
  const beforeCursor = input.slice(0, cursorPos);
  const afterCursor = input.slice(cursorPos);
  const fullInput = input.trim();
  
  const matrixOperations = ['det', 'eigenval', 'eigenvec', 'inv', 'transpose', 'rank', 'rref'];
  const vectorOperations = ['norm'];
  const wrapOperations = ['d/dx', 'd²/dx²', '∂x', '∂y', '∫', 'expand', 'factor', 'taylor'];
  const clearOperations = ['solve', 'lim', '∑'];
  
  if (matrixOperations.includes(label)) {
    if (isMatrixOrVector(fullInput)) {
      const opMap = {
        'det': 'determinant ',
        'eigenval': 'eigenvalues ',
        'eigenvec': 'eigenvectors ',
        'inv': 'inverse ',
        'transpose': 'transpose ',
        'rank': 'rank ',
        'rref': 'row reduce '
      };
      return {
        input: opMap[label] + fullInput,
        cursorPos: null
      };
    } else if (hasFunction(fullInput)) {
      const opMap = {
        'det': 'determinant {{},{}}',
        'eigenval': 'eigenvalues {{},{}}',
        'eigenvec': 'eigenvectors {{},{}}',
        'inv': 'inverse {{},{}}',
        'transpose': 'transpose {{},{}}',
        'rank': 'rank {{},{}}',
        'rref': 'row reduce {{},{}}'
      };
      return {
        input: opMap[label],
        cursorPos: opMap[label].indexOf('{') + 2
      };
    }
  }
  
  if (label === 'norm') {
    if (isMatrixOrVector(fullInput)) {
      return {
        input: 'norm ' + fullInput,
        cursorPos: null
      };
    } else if (hasFunction(fullInput)) {
      return {
        input: 'norm {,,}',
        cursorPos: 6
      };
    }
  }
  
  if (wrapOperations.includes(label)) {
    if (fullInput && !hasFunction(fullInput)) {
      const templates = {
        'd/dx': `derivative of ${fullInput}`,
        'd²/dx²': `second derivative of ${fullInput}`,
        '∂x': `partial derivative of ${fullInput} with respect to x`,
        '∂y': `partial derivative of ${fullInput} with respect to y`,
        '∫': `integral of ${fullInput}`,
        'expand': `expand ${fullInput}`,
        'factor': `factor ${fullInput}`,
        'taylor': `taylor series ${fullInput}`
      };
      return {
        input: templates[label],
        cursorPos: null
      };
    }
  }
  
  if (clearOperations.includes(label)) {
    if (hasFunction(fullInput)) {
      const templates = {
        'solve': 'solve =0',
        'lim': 'limit of  as x approaches 0',
        '∑': 'sum , k=1 to 10'
      };
      return {
        input: templates[label],
        cursorPos: templates[label].indexOf(' ') + (label === 'solve' ? 6 : 0)
      };
    }
  }
  
  return null;
}

const OPERATIONS = {
  'AC': (input, output, cursorPos) => ({ input: '', output: '', cursorPos: 0 }),
  'C': (input, output, cursorPos) => {
    if (cursorPos > 0) {
      const newInput = input.slice(0, cursorPos - 1) + input.slice(cursorPos);
      return { input: newInput, output, cursorPos: cursorPos - 1 };
    }
    return { input, output, cursorPos };
  },
  'Ans': (input, output, cursorPos) => {
    const newInput = input.slice(0, cursorPos) + output + input.slice(cursorPos);
    return { input: newInput, output, cursorPos: cursorPos + output.length };
  },
  
  '÷': (input, output, cursorPos) => {
    const newInput = input.slice(0, cursorPos) + '/' + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 1 };
  },
  '×': (input, output, cursorPos) => {
    const newInput = input.slice(0, cursorPos) + '*' + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 1 };
  },
  '−': (input, output, cursorPos) => {
    const newInput = input.slice(0, cursorPos) + '-' + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 1 };
  },
  '√': (input, output, cursorPos) => {
    const newInput = input.slice(0, cursorPos) + 'sqrt(' + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 5 };
  },
  
  'matrix': (input, output, cursorPos) => {
    const template = '{{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 2 };
  },
  'vector': (input, output, cursorPos) => {
    const template = '{,,}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 1 };
  },
  
  'det': (input, output, cursorPos) => {
    const smart = getSmartOperation('det', input, cursorPos);
    if (smart) return smart;
    const template = 'determinant {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 14 };
  },
  'eigenval': (input, output, cursorPos) => {
    const smart = getSmartOperation('eigenval', input, cursorPos);
    if (smart) return smart;
    const template = 'eigenvalues {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 14 };
  },
  'eigenvec': (input, output, cursorPos) => {
    const smart = getSmartOperation('eigenvec', input, cursorPos);
    if (smart) return smart;
    const template = 'eigenvectors {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 15 };
  },
  'inv': (input, output, cursorPos) => {
    const smart = getSmartOperation('inv', input, cursorPos);
    if (smart) return smart;
    const template = 'inverse {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 10 };
  },
  'transpose': (input, output, cursorPos) => {
    const smart = getSmartOperation('transpose', input, cursorPos);
    if (smart) return smart;
    const template = 'transpose {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 12 };
  },
  'rank': (input, output, cursorPos) => {
    const smart = getSmartOperation('rank', input, cursorPos);
    if (smart) return smart;
    const template = 'rank {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 7 };
  },
  'rref': (input, output, cursorPos) => {
    const smart = getSmartOperation('rref', input, cursorPos);
    if (smart) return smart;
    const template = 'row reduce {{},{}}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 13 };
  },
  'norm': (input, output, cursorPos) => {
    const smart = getSmartOperation('norm', input, cursorPos);
    if (smart) return smart;
    const template = 'norm {,,}';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 6 };
  },
  
  'd/dx': (input, output, cursorPos) => {
    const smart = getSmartOperation('d/dx', input, cursorPos);
    if (smart) return smart;
    const template = 'derivative of ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + template.length };
  },
  'd²/dx²': (input, output, cursorPos) => {
    const smart = getSmartOperation('d²/dx²', input, cursorPos);
    if (smart) return smart;
    const template = 'second derivative of ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + template.length };
  },
  '∂x': (input, output, cursorPos) => {
    const smart = getSmartOperation('∂x', input, cursorPos);
    if (smart) return smart;
    const template = 'partial derivative of  with respect to x';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 22 };
  },
  '∂y': (input, output, cursorPos) => {
    const smart = getSmartOperation('∂y', input, cursorPos);
    if (smart) return smart;
    const template = 'partial derivative of  with respect to y';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 22 };
  },
  '∫': (input, output, cursorPos) => {
    const smart = getSmartOperation('∫', input, cursorPos);
    if (smart) return smart;
    const template = 'integral of ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + template.length };
  },
  'lim': (input, output, cursorPos) => {
    const smart = getSmartOperation('lim', input, cursorPos);
    if (smart) return smart;
    const template = 'limit of  as x approaches 0';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 9 };
  },
  
  '∑': (input, output, cursorPos) => {
    const smart = getSmartOperation('∑', input, cursorPos);
    if (smart) return smart;
    const template = 'sum , k=1 to 10';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 4 };
  },
  'taylor': (input, output, cursorPos) => {
    const smart = getSmartOperation('taylor', input, cursorPos);
    if (smart) return smart;
    const template = 'taylor series ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + template.length };
  },
  'solve': (input, output, cursorPos) => {
    const smart = getSmartOperation('solve', input, cursorPos);
    if (smart) return smart;
    const template = 'solve =0';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 6 };
  },
  'expand': (input, output, cursorPos) => {
    const smart = getSmartOperation('expand', input, cursorPos);
    if (smart) return smart;
    const template = 'expand ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + template.length };
  },
  'factor': (input, output, cursorPos) => {
    const smart = getSmartOperation('factor', input, cursorPos);
    if (smart) return smart;
    const template = 'factor ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + template.length };
  },
  
  'dot': (input, output, cursorPos) => {
    const template = ' . ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 3 };
  },
  'cross': (input, output, cursorPos) => {
    const template = ' x ';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 3 };
  },
  
  'sin': (input, output, cursorPos) => {
    const template = 'sin(';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 4 };
  },
  'cos': (input, output, cursorPos) => {
    const template = 'cos(';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 4 };
  },
  'tan': (input, output, cursorPos) => {
    const template = 'tan(';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 4 };
  },
  'ln': (input, output, cursorPos) => {
    const template = 'ln(';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 3 };
  },
  'log': (input, output, cursorPos) => {
    const template = 'log(';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 4 };
  },
  'abs': (input, output, cursorPos) => {
    const template = 'abs(';
    const newInput = input.slice(0, cursorPos) + template + input.slice(cursorPos);
    return { input: newInput, output: null, cursorPos: cursorPos + 4 };
  }
};

const STORAGE_KEY = 'smc_settings';
let calcClosed = false;

function loadSettings() {
  calcClosed = false;
}

function saveSettings() {
  calcClosed = true;
}

loadSettings();

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

(function () {
  if (document.getElementById('smc-container')) return;

  const container = document.createElement('div');
  container.id = 'smc-container';
  container.innerHTML = `
    <div id="smc-popup" class="smc-popup" style="display: none;">
      <div class="smc-popup-header" id="smc-popup-drag-handle">
        <span class="smc-popup-title">🧮 Smart MathCalc</span>
        <span class="smc-popup-close" id="smc-popup-close">✕</span>
      </div>
      <div class="smc-popup-body">
        <div class="smc-input-output-container">
          <div class="smc-input-section">
            <label for="smc-calc-input">INPUT</label>
            <div style="position: relative;">
              <textarea id="smc-calc-input" placeholder="Enter expression or use buttons..." rows="2"></textarea>
              <button class="smc-copy-btn" id="smc-copy-input-btn" title="Copy input">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="smc-output-section">
            <label for="smc-calc-output">RESULT</label>
            <div style="position: relative;">
              <textarea id="smc-calc-output" placeholder="Result..." rows="2" readonly></textarea>
              <button class="smc-copy-btn" id="smc-copy-output-btn" title="Copy result">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div id="smc-button-grid"></div>
        <div id="smc-quick-help" class="smc-quick-help">
          💡 Hover over buttons for help • You can also type directly using keyboard
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = chrome.runtime.getURL('styles.css');
  document.head.appendChild(style);

  initCalculator();
  setupEventListeners();
  setupCopyButtons();
  initDragSystem();
  detectMathContent();

  const debouncedDetect = debounce(detectMathContent, CONFIG.DEBOUNCE_DELAY);
  const observer = new MutationObserver(debouncedDetect);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();

function setupCopyButtons() {
  const copyInputBtn = document.getElementById('smc-copy-input-btn');
  const copyOutputBtn = document.getElementById('smc-copy-output-btn');
  const inputEl = document.getElementById('smc-calc-input');
  const outputEl = document.getElementById('smc-calc-output');

  copyInputBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const text = inputEl.value;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        copyInputBtn.style.color = '#00ff00';
        setTimeout(() => {
          copyInputBtn.style.color = '';
        }, 1000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  });

  copyOutputBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const text = outputEl.value;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        copyOutputBtn.style.color = '#00ff00';
        setTimeout(() => {
          copyOutputBtn.style.color = '';
        }, 1000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  });
}

function setupEventListeners() {
  const popup = document.getElementById('smc-popup');
  const popupClose = document.getElementById('smc-popup-close');
  const popupHeader = document.getElementById('smc-popup-drag-handle');
  const popupBody = document.querySelector('.smc-popup-body');
  
  let isMinimized = false;
  let savedRightPosition = null;

  popupClose.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isMinimized) {
      calcClosed = true;
      saveSettings();
      popup.style.display = 'none';
    } else {
      const currentRight = window.innerWidth - popup.offsetLeft - popup.offsetWidth;
      const currentTop = popup.offsetTop;
      savedRightPosition = currentRight;
      
      isMinimized = true;
      popup.classList.add('smc-minimized');
      popupBody.style.display = 'none';
      
      popup.style.position = 'fixed';
      popup.style.right = currentRight + 'px';
      popup.style.top = currentTop + 'px';
      popup.style.left = 'auto';
      popup.style.width = '220px';
    }
  });

  popupHeader.addEventListener('click', (e) => {
    if (e.target === popupClose) return;
    
    const wasDragging = popup.getAttribute('data-was-dragging') === 'true';
    if (wasDragging) {
      popup.setAttribute('data-was-dragging', 'false');
      return;
    }
    
    if (isMinimized) {
      const currentTop = popup.offsetTop;
      
      isMinimized = false;
      popup.classList.remove('smc-minimized');
      popupBody.style.display = 'block';
      
      popup.style.position = 'fixed';
      popup.style.right = savedRightPosition + 'px';
      popup.style.top = currentTop + 'px';
      popup.style.left = 'auto';
      popup.style.width = '650px';
    }
  });
}

function detectMathContent() {
  if (calcClosed) return;

  const quickChecks = [
    () => /(math|calculus|algebra|test|prep|practice|quiz|exam)/i.test(window.location.href),
    () => /(mathematics|practice|questions|problems|quiz)/i.test(document.title),
    () => Array.from(document.querySelectorAll('button, a')).some(el => /show\s*answer/i.test(el.textContent)),
    () => /[A-E]\.\s*[\$\d\w]/m.test(document.body.innerText.slice(0, 5000))
  ];
  
  if (quickChecks.some(check => check())) {
    const popup = document.getElementById('smc-popup');
    if (popup) popup.style.display = 'block';
    return;
  }

  const mathPatterns = [
    /\b\d+\s*[+\-×÷*/^]\s*\d+\b/,
    /\b\d+%\s*(off|discount|increase)/i,
    /\d+\s*\([^)]*[+\-*/^][^)]*\)/,
    /[a-z]\s*\([^)]+\)\s*=\s*[a-z]/i,
    /\b\d+\^\d+\b/,
    /\b(sin|cos|tan|log|ln|sqrt|exp)\s*\(/i,
    /\b\d+\/\d+\b/,
    /\b(matrix|determinant|eigen|integral|derivative|equation|solve)\b/i,
    /(∫|∂|∇|lim|d\/dx|≈|≠|≤|≥)/,
    /\$\d+.*\$\d+/,
    /\{\{.*,.*\}\}/,
    /\{.*,.*,.*\}/
  ];
  
  const priorityAreas = document.querySelectorAll('article, main, [class*="content"], [class*="question"], [class*="problem"]');
  
  let found = false;
  
  for (let i = 0; i < Math.min(priorityAreas.length, 5); i++) {
    const text = priorityAreas[i].innerText || '';
    if (text && mathPatterns.some(pattern => pattern.test(text))) {
      found = true;
      break;
    }
  }
  
  if (!found) {
    const selectors = 'p, h1, h2, h3, code, pre, li, td';
    const elements = document.querySelectorAll(selectors);
    const limit = Math.min(elements.length, CONFIG.MAX_ELEMENTS_TO_CHECK);
    
    for (let i = 0; i < limit; i++) {
      const text = elements[i].innerText || '';
      if (text && mathPatterns.some(pattern => pattern.test(text))) {
        found = true;
        break;
      }
    }
  }
  
  const popup = document.getElementById('smc-popup');
  if (popup) popup.style.display = found ? 'block' : 'none';
}

function initCalculator() {
  const grid = document.getElementById('smc-button-grid');
  grid.innerHTML = '';
  
  buttonLayout.forEach(btnData => {
    const btn = document.createElement('button');
    
    if (btnData.centered) {
      btn.className = 'smc-calc-btn smc-calc-btn-special smc-calc-btn-centered';
    } else if (btnData.special) {
      btn.className = 'smc-calc-btn smc-calc-btn-special';
    } else {
      btn.className = 'smc-calc-btn';
    }
    
    btn.textContent = btnData.label;
    btn.title = btnData.tip;
    btn.addEventListener('click', () => handleInput(btnData.label));
    grid.appendChild(btn);
  });
}

function handleInput(label) {
  const inputEl = document.getElementById('smc-calc-input');
  const outputEl = document.getElementById('smc-calc-output');
  const currentInput = inputEl.value;
  const currentOutput = outputEl.value;
  const cursorPos = inputEl.selectionStart;

  if (label === "=") {
    if (!currentInput.trim()) {
      outputEl.value = "⚠ Enter expression";
      return;
    }
    outputEl.value = "⏳ Calculating...";
    chrome.runtime.sendMessage(
      { type: 'wolframQuery', input: currentInput },
      response => {
        if (chrome.runtime.lastError) {
          outputEl.value = "❌ Extension error";
          return;
        }
        if (response && response.result) {
          outputEl.value = response.result;
        } else {
          outputEl.value = "❌ No response";
        }
      }
    );
    return;
  }

  if (OPERATIONS[label]) {
    const result = OPERATIONS[label](currentInput, currentOutput, cursorPos);
    if (result.input !== undefined) inputEl.value = result.input;
    if (result.output !== undefined) outputEl.value = result.output;
    
    if (result.cursorPos !== undefined && result.cursorPos !== null) {
      inputEl.focus();
      inputEl.setSelectionRange(result.cursorPos, result.cursorPos);
    }
  } else {
    const newInput = currentInput.slice(0, cursorPos) + label + currentInput.slice(cursorPos);
    inputEl.value = newInput;
    inputEl.focus();
    inputEl.setSelectionRange(cursorPos + label.length, cursorPos + label.length);
  }
}

function initDragSystem() {
  const popup = document.getElementById('smc-popup');
  const popupHandle = document.getElementById('smc-popup-drag-handle');
  makeDraggable(popup, popupHandle);
}

function makeDraggable(element, dragHandle) {
  if (!element || !dragHandle) return;
  if (dragHandle.hasAttribute('data-drag-initialized')) return;
  dragHandle.setAttribute('data-drag-initialized', 'true');

  let isDragging = false;
  let hasMoved = false;
  let startX, startY, startLeft, startTop;

  dragHandle.style.cursor = 'move';
  dragHandle.style.userSelect = 'none';

  dragHandle.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (e.target.id === 'smc-popup-close') return;

    e.preventDefault();
    e.stopPropagation();

    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    
    const rect = element.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;

    element.style.position = 'fixed';
    element.style.left = startLeft + 'px';
    element.style.top = startTop + 'px';
    element.style.right = 'auto';
    element.style.bottom = 'auto';
    element.style.margin = '0';

    dragHandle.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > CONFIG.DRAG_THRESHOLD) {
      hasMoved = true;
    }

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxX));
    newTop = Math.max(0, Math.min(newTop, maxY));

    element.style.left = newLeft + 'px';
    element.style.top = newTop + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    isDragging = false;
    dragHandle.style.cursor = 'move';
    document.body.style.userSelect = '';
    
    if (hasMoved) {
      element.setAttribute('data-was-dragging', 'true');
      setTimeout(() => {
        element.setAttribute('data-was-dragging', 'false');
      }, 100);
    }
  });
}
