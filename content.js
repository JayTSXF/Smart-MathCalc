// ============================================
// Configuration and Constants
// ============================================
const CONFIG = {
  DEBOUNCE_DELAY: 500,
  DRAG_THRESHOLD: 5,
  MAX_ELEMENTS_TO_CHECK: 200
};

// 按功能分类的按钮布局 - 无分隔线版本
const buttonLayout = [
  // 第一行：数字 7-9 和基础运算
  { label: "7", tip: "Number 7" },
  { label: "8", tip: "Number 8" },
  { label: "9", tip: "Number 9" },
  { label: "÷", tip: "Division operator" },
  { label: "(", tip: "Left parenthesis" },
  { label: ")", tip: "Right parenthesis" },
  { label: "π", tip: "Pi constant (3.14159...)" },
  { label: "e", tip: "Euler's number (2.71828...)" },
  
  // 第二行：数字 4-6
  { label: "4", tip: "Number 4" },
  { label: "5", tip: "Number 5" },
  { label: "6", tip: "Number 6" },
  { label: "×", tip: "Multiplication operator" },
  { label: "[", tip: "Left bracket for lists" },
  { label: "]", tip: "Right bracket for lists" },
  { label: "sin", tip: "Sine function - Example: sin(π/2) = 1" },
  { label: "cos", tip: "Cosine function - Example: cos(0) = 1" },
  
  // 第三行：数字 1-3
  { label: "1", tip: "Number 1" },
  { label: "2", tip: "Number 2" },
  { label: "3", tip: "Number 3" },
  { label: "−", tip: "Subtraction operator" },
  { label: "{", tip: "Left brace for vectors/sets" },
  { label: "}", tip: "Right brace for vectors/sets" },
  { label: "tan", tip: "Tangent function - Example: tan(π/4) = 1" },
  { label: "ln", tip: "Natural logarithm (base e) - Example: ln(e) = 1" },
  
  // 第四行：0 和特殊运算
  { label: "0", tip: "Number 0" },
  { label: ".", tip: "Decimal point" },
  { label: ",", tip: "Comma separator for lists and coordinates" },
  { label: "+", tip: "Addition operator" },
  { label: "^", tip: "Power operator - Example: 2^3 = 8" },
  { label: "√", tip: "Square root - Generates: sqrt(number)" },
  { label: "log", tip: "Base 10 logarithm - Example: log(100) = 2" },
  { label: "abs", tip: "Absolute value - Example: abs(-5) = 5" },
  
  // 第五行：变量和常数
  { label: "x", tip: "Variable x" },
  { label: "y", tip: "Variable y" },
  { label: "z", tip: "Variable z" },
  { label: "i", tip: "Imaginary unit (√-1)" },
  { label: "∞", tip: "Infinity symbol" },
  { label: "!", tip: "Factorial - Example: 5! = 120" },
  { label: "C", tip: "Clear: Delete last character" },
  { label: "AC", tip: "All Clear: Delete everything" },
  
  // 微积分区域
  { 
    label: "d/dx", 
    tip: "First derivative with respect to x\nExample: 'derivative of x^2 with respect to x' → Result: 2x\nFor multiple variables, specify which to use\nTry: derivative of x^3+2x^2-5x+1" 
  },
  { 
    label: "d²/dx²", 
    tip: "Second derivative with respect to x\nUseful for finding concavity and inflection points\nExample: 'second derivative of x^3' → Result: 6x\nTry: second derivative of sin(x)" 
  },
  { 
    label: "∫", 
    tip: "Indefinite integral (antiderivative)\nExample: 'integrate x^2 dx' → Result: x³/3 + C\nFor definite integral, add limits:\n'integrate x^2 dx from 0 to 5'\nTry: integrate sin(x) dx" 
  },
  { 
    label: "∫∫", 
    tip: "Double integral over a region\nUsed for area, volume, and surface calculations\nExample: 'double integral x*y dxdy from x=0 to 1, y=0 to 2'\nSpecify bounds for both variables\nTry: double integral x^2+y^2 dxdy" 
  },
  { 
    label: "∫∫∫", 
    tip: "Triple integral over 3D region\nUsed for volume in 3D space\nExample: 'triple integral x*y*z dxdydz'\nSpecify three sets of bounds\nTry: triple integral 1 dxdydz (calculates volume)" 
  },
  { 
    label: "lim", 
    tip: "Limit as x approaches a value\nExample: 'limit of (sin(x)/x) as x->0' → Result: 1\nFor infinity: 'limit of 1/x as x->∞' → Result: 0\nFor left/right limits, specify direction\nTry: limit of (x^2-1)/(x-1) as x->1" 
  },
  { 
    label: "∂/∂x", 
    tip: "Partial derivative with respect to x\nHolds other variables constant while differentiating\nExample: 'partial derivative of x^2*y with respect to x' → Result: 2xy\nUsed for multivariable functions\nTry: partial derivative of x^2+y^2+z^2 with respect to x" 
  },
  { 
    label: "∂/∂y", 
    tip: "Partial derivative with respect to y\nExample: 'partial derivative of x^2*y^3 with respect to y' → Result: 3x²y²\nUseful for finding rates of change in one direction\nTry: partial derivative of sin(x*y) with respect to y" 
  },
  { 
    label: "∂/∂z", 
    tip: "Partial derivative with respect to z\nExample: 'partial derivative of x*y*z^2 with respect to z' → Result: 2xyz\nTry: partial derivative of e^(x+y+z) with respect to z" 
  },
  { 
    label: "grad", 
    tip: "Gradient vector (all partial derivatives)\nGives direction of steepest ascent\nExample: 'gradient of x^2+y^2+z^2' → Result: {2x, 2y, 2z}\nReturns a vector of partial derivatives\nTry: gradient of x*y+y*z+x*z" 
  },
  { 
    label: "div", 
    tip: "Divergence of a vector field\nMeasures how much a field 'spreads out'\nExample: 'divergence of {x, y, z}' → Result: 3\nInput should be a vector field\nTry: divergence of {x^2, y^2, z^2}" 
  },
  { 
    label: "curl", 
    tip: "Curl of a vector field (rotation)\nMeasures circulation/rotation at a point\nExample: 'curl of {y, -x, 0}' → Result: {0, 0, -2}\nResults in a vector\nTry: curl of {-y, x, 0}" 
  },
  { 
    label: "∇", 
    tip: "Del operator (nabla)\nSymbol for gradient, divergence, or curl\nUsed in vector calculus notation" 
  },
  { 
    label: "taylor", 
    tip: "Taylor series expansion around a point\nApproximates functions with polynomials\nExample: 'taylor series of sin(x) at x=0' → Result: x - x³/6 + x⁵/120...\nSpecify center point and order if needed\nTry: taylor series of e^x" 
  },
  { 
    label: "laplace", 
    tip: "Laplace transform of a function\nConverts time domain to frequency domain\nExample: 'laplace transform of t^2' → Result: 2/s³\nUseful for solving differential equations\nTry: laplace transform of sin(t)" 
  },
  { 
    label: "sum", 
    tip: "Summation notation\nExample: 'sum of k from k=1 to 10' → Result: 55\nFor infinite series: 'sum of 1/2^k from k=1 to infinity'\nTry: sum of k^2 from k=1 to n" 
  },
  
  // 线性代数区域
  { 
    label: "matrix", 
    tip: "Create a matrix using double braces\nFormat: {{row1_col1, row1_col2}, {row2_col1, row2_col2}}\nExample: {{1,2,3},{4,5,6}}\nEach inner {} is one row\nTry: {{1,0},{0,1}} for identity matrix" 
  },
  { 
    label: "vector", 
    tip: "Create a vector using single braces\nFormat: {component1, component2, component3}\nExample: {1, 2, 3} for 3D vector\nCan be 2D, 3D, or higher dimensions\nTry: {3, 4} for 2D vector" 
  },
  { 
    label: "det", 
    tip: "Determinant of a square matrix\nMeasures scaling factor and invertibility\nExample: 'determinant of {{1,2},{3,4}}' → Result: -2\nIf det=0, matrix is singular (non-invertible)\nTry: determinant of {{2,1},{1,2}}" 
  },
  { 
    label: "inv", 
    tip: "Inverse of a matrix (if it exists)\nA × A⁻¹ = Identity matrix\nExample: 'inverse of {{2,1},{1,2}}' → Result: {{2/3,-1/3},{-1/3,2/3}}\nOnly works if determinant ≠ 0\nTry: inverse of {{1,2},{3,4}}" 
  },
  { 
    label: "transpose", 
    tip: "Transpose of a matrix (flip rows and columns)\nRows become columns and vice versa\nExample: 'transpose {{1,2},{3,4}}' → Result: {{1,3},{2,4}}\nFor vector: {1,2,3} → {{1},{2},{3}}\nTry: transpose {{1,2,3},{4,5,6}}" 
  },
  { 
    label: "eigenval", 
    tip: "Eigenvalues of a matrix\nScalars λ where Av = λv for some vector v\nExample: 'eigenvalues of {{3,1},{1,3}}' → Result: {4, 2}\nUseful for stability analysis and diagonalization\nTry: eigenvalues of {{2,1},{1,2}}" 
  },
  { 
    label: "eigenvec", 
    tip: "Eigenvectors of a matrix\nVectors v where Av = λv\nExample: 'eigenvectors of {{3,1},{1,3}}'\nReturns vectors corresponding to each eigenvalue\nTry: eigenvectors of {{2,0},{0,3}}" 
  },
  { 
    label: "trace", 
    tip: "Trace of a matrix (sum of diagonal elements)\nEqual to sum of eigenvalues\nExample: 'trace {{1,2,3},{4,5,6},{7,8,9}}' → Result: 15 (1+5+9)\nOnly for square matrices\nTry: trace {{a,b},{c,d}}" 
  },
  { 
    label: "rank", 
    tip: "Rank of a matrix (number of linearly independent rows/columns)\nMaximum number of independent rows or columns\nExample: 'rank {{1,2},{2,4}}' → Result: 1 (rows are dependent)\nFull rank means all rows/columns independent\nTry: rank {{1,0},{0,1}}" 
  },
  { 
    label: "rref", 
    tip: "Reduced Row Echelon Form\nSimplifies matrix by row operations (Gaussian elimination)\nExample: 'rref {{1,2,3},{4,5,6}}'\nUseful for solving systems of equations\nLeading 1s with 0s below and above\nTry: rref {{2,4,6},{1,2,3}}" 
  },
  { 
    label: "diag", 
    tip: "Diagonalize a matrix\nFinds P and D where A = PDP⁻¹ (D is diagonal)\nExample: 'diagonalize {{3,1},{1,3}}'\nD contains eigenvalues, P contains eigenvectors\nNot all matrices can be diagonalized\nTry: diagonalize {{2,1},{1,2}}" 
  },
  { 
    label: "dot", 
    tip: "Dot product (scalar product) of two vectors\nMultiply corresponding components and sum\nExample: '{1,2,3} dot {4,5,6}' → Result: 32 (1×4+2×5+3×6)\nResult is a scalar (number)\nTry: {1,0,0} dot {0,1,0}" 
  },
  { 
    label: "cross", 
    tip: "Cross product of two 3D vectors\nProduces a vector perpendicular to both\nExample: '{1,0,0} cross {0,1,0}' → Result: {0,0,1}\nOnly defined in 3D space\nMagnitude = |a||b|sin(θ)\nTry: {1,2,3} cross {4,5,6}" 
  },
  { 
    label: "norm", 
    tip: "Norm (length/magnitude) of a vector\nCalculates √(x₁² + x₂² + x₃² + ...)\nExample: 'norm {3,4}' → Result: 5\nAlso called Euclidean norm or L2 norm\nTry: norm {1,1,1}" 
  },
  { 
    label: "solve", 
    tip: "Solve equations or systems of equations\nExample: 'solve x^2+2x+1=0' → Result: x=-1\nFor systems: 'solve {2x+y=5, x-y=1}'\nCan solve linear, quadratic, or polynomial equations\nTry: solve x^2-5x+6=0" 
  },
  { 
    label: "Ans", 
    tip: "Insert the previous answer\nUseful for chaining calculations\nClick after getting a result to reuse it" 
  },
  
  // 等号按钮（居中，特殊样式）
  { label: "=", tip: "Calculate: Send expression to WolframAlpha", special: true, centered: true }
];

// 操作映射（保持不变）
const OPERATIONS = {
  'AC': (input, output) => ({ input: '', output: '' }),
  'C': (input, output) => ({ input: input.slice(0, -1), output }),
  'Ans': (input, output) => ({ input: input + output, output }),
  
  '÷': (input) => ({ input: input + '/', output: null }),
  '×': (input) => ({ input: input + '*', output: null }),
  '−': (input) => ({ input: input + '-', output: null }),
  '√': (input) => ({ input: input + 'sqrt(', output: null }),
  
  'matrix': (input) => ({ input: input + '{{1,2},{3,4}}', output: null }),
  'vector': (input) => ({ input: input + '{1,2,3}', output: null }),
  
  'det': (input) => ({ 
    input: input && input.trim() ? `determinant of ${input}` : 'determinant of {{1,2},{3,4}}', 
    output: null 
  }),
  'eigenval': (input) => ({ 
    input: input && input.trim() ? `eigenvalues of ${input}` : 'eigenvalues of {{1,2},{3,4}}', 
    output: null 
  }),
  'eigenvec': (input) => ({ 
    input: input && input.trim() ? `eigenvectors of ${input}` : 'eigenvectors of {{1,2},{3,4}}', 
    output: null 
  }),
  'inv': (input) => ({ 
    input: input && input.trim() ? `inverse of ${input}` : 'inverse of {{2,1},{1,2}}', 
    output: null 
  }),
  'transpose': (input) => ({ 
    input: input && input.trim() ? `transpose ${input}` : 'transpose {{1,2},{3,4}}', 
    output: null 
  }),
  'trace': (input) => ({ 
    input: input && input.trim() ? `trace ${input}` : 'trace {{1,2},{3,4}}', 
    output: null 
  }),
  'rank': (input) => ({ 
    input: input && input.trim() ? `rank ${input}` : 'rank {{1,2},{3,4}}', 
    output: null 
  }),
  'rref': (input) => ({ 
    input: input && input.trim() ? `rref ${input}` : 'rref {{1,2,3},{4,5,6}}', 
    output: null 
  }),
  'norm': (input) => ({ 
    input: input && input.trim() ? `norm ${input}` : 'norm {3,4}', 
    output: null 
  }),
  'diag': (input) => ({ 
    input: input && input.trim() ? `diagonalize ${input}` : 'diagonalize {{1,2},{3,4}}', 
    output: null 
  }),
  
  'd/dx': (input) => ({ 
    input: input && input.trim() ? `derivative of ${input} with respect to x` : 'derivative of x^2 with respect to x', 
    output: null 
  }),
  'd²/dx²': (input) => ({ 
    input: input && input.trim() ? `second derivative of ${input}` : 'second derivative of x^3', 
    output: null 
  }),
  '∂/∂x': (input) => ({ 
    input: input && input.trim() ? `partial derivative of ${input} with respect to x` : 'partial derivative of x^2*y with respect to x', 
    output: null 
  }),
  '∂/∂y': (input) => ({ 
    input: input && input.trim() ? `partial derivative of ${input} with respect to y` : 'partial derivative of x^2*y with respect to y', 
    output: null 
  }),
  '∂/∂z': (input) => ({ 
    input: input && input.trim() ? `partial derivative of ${input} with respect to z` : 'partial derivative of x*y*z with respect to z', 
    output: null 
  }),
  '∫': (input) => ({ 
    input: input && input.trim() ? `integrate ${input}` : 'integrate x^2 dx', 
    output: null 
  }),
  '∫∫': (input) => ({ 
    input: input && input.trim() ? `double integral ${input}` : 'double integral x*y dxdy', 
    output: null 
  }),
  '∫∫∫': (input) => ({ 
    input: input && input.trim() ? `triple integral ${input}` : 'triple integral x*y*z dxdydz', 
    output: null 
  }),
  'lim': (input) => ({ 
    input: input && input.trim() ? `limit of ${input} as x->0` : 'limit of sin(x)/x as x->0', 
    output: null 
  }),
  'grad': (input) => ({ 
    input: input && input.trim() ? `gradient of ${input}` : 'gradient of x^2+y^2+z^2', 
    output: null 
  }),
  'div': (input) => ({ 
    input: input && input.trim() ? `divergence of ${input}` : 'divergence of {x,y,z}', 
    output: null 
  }),
  'curl': (input) => ({ 
    input: input && input.trim() ? `curl of ${input}` : 'curl of {y,-x,0}', 
    output: null 
  }),
  'taylor': (input) => ({ 
    input: input && input.trim() ? `taylor series of ${input}` : 'taylor series of sin(x)', 
    output: null 
  }),
  'laplace': (input) => ({ 
    input: input && input.trim() ? `laplace transform of ${input}` : 'laplace transform of t^2', 
    output: null 
  }),
  'solve': (input) => ({ 
    input: input && input.trim() ? `solve ${input}` : 'solve x^2+2x+1=0', 
    output: null 
  }),
  
  'dot': (input) => ({ input: input + ' dot ', output: null }),
  'cross': (input) => ({ input: input + ' cross ', output: null }),
  '∇': (input) => ({ input: input + 'nabla ', output: null }),
  'sin': (input) => ({ input: input + 'sin(', output: null }),
  'cos': (input) => ({ input: input + 'cos(', output: null }),
  'tan': (input) => ({ input: input + 'tan(', output: null }),
  'ln': (input) => ({ input: input + 'ln(', output: null }),
  'log': (input) => ({ input: input + 'log(', output: null }),
  'abs': (input) => ({ input: input + 'abs(', output: null }),
  'sum': (input) => ({ input: input + 'sum ', output: null })
};

// ============================================
// State Management - 使用 localStorage
// ============================================
let reminderDismissed = false;

const STORAGE_KEY = 'smc_settings';

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const settings = JSON.parse(saved);
      reminderDismissed = settings.reminderDismissed || false;
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      reminderDismissed
    }));
  } catch (e) {
    console.warn('Failed to save settings:', e);
  }
}

loadSettings();

// ============================================
// Utility Functions
// ============================================
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ============================================
// Main Initialization
// ============================================
(function () {
  if (document.getElementById('smc-container')) return;

  const container = document.createElement('div');
  container.id = 'smc-container';
  container.innerHTML = `
    <div id="smc-popup" class="smc-popup" style="display: none;">
      <div class="smc-popup-header" id="smc-drag-header">
        <span class="smc-popup-title">📐 Smart MathCalc</span>
        <span class="smc-popup-close" id="smc-popup-close">✕</span>
      </div>
      <div class="smc-popup-body">
        <div class="smc-input-output-container">
          <div class="smc-input-section">
            <label for="smc-calc-input">INPUT EXPRESSION:</label>
            <textarea id="smc-calc-input" placeholder="Enter mathematical expression..." rows="3"></textarea>
          </div>
          <div class="smc-output-section">
            <label for="smc-calc-output">RESULT:</label>
            <textarea id="smc-calc-output" placeholder="Result will appear here..." rows="3" readonly></textarea>
          </div>
        </div>
        <div id="smc-button-grid"></div>
        <div id="smc-quick-help" class="smc-quick-help">
          💡 Hover over any button to see detailed usage examples
        </div>
      </div>
    </div>
    <div id="smc-reminder" class="smc-reminder" style="display: none;">
      <div class="smc-reminder-inner">
        <span class="smc-reminder-icon" id="smc-reminder-trigger">🧮</span>
        <span class="smc-reminder-text" id="smc-reminder-trigger2">Need help with math?</span>
        <span class="smc-reminder-close" id="smc-reminder-close">✕</span>
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

  makeDraggable(document.getElementById('smc-popup'), 'smc-drag-header');
  makeDraggable(document.getElementById('smc-reminder'), 'smc-reminder-inner');

  detectMathContent();

  const debouncedDetect = debounce(detectMathContent, CONFIG.DEBOUNCE_DELAY);
  const observer = new MutationObserver(debouncedDetect);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();

// ============================================
// Event Listeners Setup
// ============================================
function setupEventListeners() {
  document.getElementById('smc-reminder-close').addEventListener('click', (event) => {
    event.stopPropagation();
    reminderDismissed = true;
    saveSettings();
    document.getElementById('smc-reminder').style.display = 'none';
  });

  document.getElementById('smc-popup-close').addEventListener('click', () => {
    document.getElementById('smc-popup').style.display = 'none';
  });

  ['smc-reminder-trigger', 'smc-reminder-trigger2'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      e.stopPropagation();
      const reminder = document.getElementById('smc-reminder');
      if (reminder.dataset.isDragging !== "true") {
        document.getElementById('smc-popup').style.display = 'block';
      }
    });
  });
}

// ============================================
// Math Content Detection
// ============================================
function detectMathContent() {
  if (reminderDismissed) return;

  const mathPatterns = [
    /\b\d+\s*[+\-×÷*/^]\s*\d+\b/,
    /\b\d+\^\d+\b/,
    /\b(sin|cos|tan|log|ln|sqrt|exp)\s*\(/i,
    /\b(matrix|determinant|eigenvalue|eigenvector|integral|derivative)\b/i,
    /(∫|∂|∇|lim|d\/dx)/,
    /\{\{.*,.*\}\}/,
    /\{.*,.*,.*\}/,
  ];
  
  const selectors = 'p, span, div, code, pre, h1, h2, h3, h4, h5, h6, td, li';
  const elements = document.querySelectorAll(selectors);
  const limit = Math.min(elements.length, CONFIG.MAX_ELEMENTS_TO_CHECK);
  
  let found = false;
  for (let i = 0; i < limit; i++) {
    const text = elements[i].innerText || '';
    if (text && mathPatterns.some(pattern => pattern.test(text))) {
      found = true;
      break;
    }
  }
  
  const reminder = document.getElementById('smc-reminder');
  if (reminder) {
    reminder.style.display = found ? 'flex' : 'none';
  }
}

// ============================================
// Calculator Functions
// ============================================
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

  if (label === "=") {
    if (!currentInput.trim()) {
      outputEl.value = "⚠ Please enter an expression";
      return;
    }
    outputEl.value = "⏳ Calculating...";
    chrome.runtime.sendMessage(
      { type: 'wolframQuery', input: currentInput },
      response => {
        if (response && response.result) {
          outputEl.value = response.result;
        } else {
          outputEl.value = "❌ Error: No response";
        }
      }
    );
    return;
  }

  if (OPERATIONS[label]) {
    const result = OPERATIONS[label](currentInput, currentOutput);
    if (result.input !== undefined) inputEl.value = result.input;
    if (result.output !== undefined) outputEl.value = result.output;
  } else {
    inputEl.value += label;
  }
}

// ============================================
// Draggable Functionality
// ============================================
function makeDraggable(elmnt, handleId) {
  const header = document.getElementById(handleId);
  if (!header) return;

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  let hasMoved = false;

  header.style.cursor = 'move';
  header.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    if (e.target.id === 'smc-reminder-close' || 
        e.target.id === 'smc-reminder-trigger' || 
        e.target.id === 'smc-reminder-trigger2' ||
        e.target.id === 'smc-popup-close') {
      return;
    }
    
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    isDragging = false;
    hasMoved = false;
    
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    
    const dx = e.clientX - pos3;
    const dy = e.clientY - pos4;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > CONFIG.DRAG_THRESHOLD) {
      isDragging = true;
      hasMoved = true;
      elmnt.dataset.isDragging = "true";
    }
    
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
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
    
    setTimeout(() => {
      elmnt.dataset.isDragging = "false";
    }, 50);
  }
}
