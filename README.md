# 🧮 Smart MathCalc

A powerful Chrome extension that automatically detects math content on webpages and provides a floating calculator with comprehensive mathematical computation powered by WolframAlpha.

---

## ✨ Features

### 🎯 Smart Detection
- Automatically scans webpages for mathematical expressions, equations, and formulas
- Shows a floating calculator when math content is detected
- Remembers if you close it and won't show again on that page

### 🧮 Comprehensive Calculator

**Basic Operations**
- Arithmetic: `+`, `−`, `×`, `÷`, `^` (powers)
- Functions: `sin`, `cos`, `tan`, `ln`, `log`, `sqrt`, `abs`
- Constants: `π`, `e`, `i`, `∞`
- Factorial: `!`

**Algebra**
- Solve equations: `solve`
- Expand expressions: `expand`
- Factor polynomials: `factor`
- Summation: `Σ`
- 
**Calculus**
- Derivatives: `d/dx`, `d²/dx²`
- Integrals: `∫`
- Limits: `lim`
- Partial derivatives: `∂x`, `∂y`
- Taylor series: `taylor`

**Linear Algebra**
- Matrix operations: `det`, `inv`, `transpose`, `rank`, `rref`
- Eigenvalues & eigenvectors: `eigenval`, `eigenvec`
- Vector operations: `dot`, `cross`, `norm`
- Create matrices: `{{1,2},{3,4}}` and vectors: `{1,2,3}`

### 💡 User-Friendly
- **Draggable interface**: Move the calculator anywhere on screen
- **Minimizable**: Click ✕ to minimize, click header to restore
- **Copy buttons**: Quickly copy input or results to clipboard
- **Detailed tooltips**: Hover over buttons for usage examples
- **Keyboard support**: Type expressions directly
- **Previous answer**: Use `Ans` button to reuse results
- **Smart operations**: Buttons adapt based on your input

---

## 📦 Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked" and select the extension folder
5. Visit any page with math content and start calculating!

---

## 🎓 Usage Examples

### Basic Math
```
Input: 2^10
Output: 1024

Input: sqrt(16)
Output: 4

Input: 5!
Output: 120
```

### Algebra
```
Input: expand (x+1)^2
Output: x^2 + 2x + 1

Input: factor x^2 - 1
Output: (x-1)(x+1)

Input: solve x^2 + 2x + 1 = 0
Output: x = -1
```

### Calculus
```
Input: derivative of x^2
Output: 2x

Input: integral of 2x
Output: x^2

Input: limit of sin(x)/x as x approaches 0
Output: 1

Input: taylor series sin(x)
Output: x - x^3/6 + x^5/120 - ...
```

### Linear Algebra
```
Input: {1,2,3} . {4,5,6}
Output: 32

Input: {1,0,0} x {0,1,0}
Output: {0,0,1}

Input: norm {3,4}
Output: 5

Input: determinant {{1,2},{3,4}}
Output: -2

Input: eigenvalues {{1,2},{3,4}}
Output: [5.372, -0.372]

Input: inverse {{2,1},{1,2}}
Output: {{0.667,-0.333},{-0.333,0.667}}

Input: rank {{1,2},{2,4}}
Output: 1
```

---

## 💡 Tips

- **Hover over any button** to see detailed usage examples
- The calculator **automatically appears** on pages with math content
- Click **✕ once** to minimize, **✕ again** to close completely
- Click the **header** when minimized to restore the calculator
- Use **natural language** for complex expressions (e.g., "derivative of x^2")
- The **= button** sends your expression to WolframAlpha for computation
- Use **copy buttons** (📋) in input/output areas to quickly copy text
- **Drag the header** to move the calculator anywhere on screen
- Press **C** to clear last character, **AC** to clear all

---

## 🐛 Troubleshooting

**Calculator not appearing?**
- Make sure the page contains mathematical content
- Try refreshing the page
- Check if extension is enabled in `chrome://extensions/`

**Getting an error?**
- Try rephrasing your expression in plain English
- Check the button tooltips for correct syntax
- Simplify complex expressions into smaller parts

---

## 📄 License

MIT License - see [LICENSE](https://jaytsxf.github.io/Smart-MathCalc/privacy-policy.html) file for details

---

## 🔗 About

- **Author**: [JayTSXF](https://github.com/JayTSXF)
- **Repository**: [Smart-MathCalc](https://github.com/JayTSXF/Smart-MathCalc)
- **Issues**: [Report a bug](https://github.com/JayTSXF/Smart-MathCalc/issues)

---

Made with ❤️ for students, engineers, and math enthusiasts

⭐ Star this repo if you find it helpful!
