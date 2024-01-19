/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("//so to store the information of the operand and all the other methods\r\n// i decided to create a calculator class\r\n\r\nclass Calculator {\r\n  constructor(\r\n    previousOperandTextElement,\r\n    currentOperandTextElement //because we need to know where to place the display text of our calculator\r\n  ) {\r\n    this.previousOperandTextElement = previousOperandTextElement;\r\n    this.currentOperandTextElement = currentOperandTextElement;\r\n    this.clear(); // we want to clear all the inputs  as soon as we create a new calculator\r\n  }\r\n  // the operations\r\n\r\n  clear() {\r\n    this.currentOperand = \"\";\r\n    this.previousOperand = \"\";\r\n    this.operation = undefined; // beacause we dont have any operation selected if we clear\r\n  }\r\n  // it add the number clicked by the user\r\n\r\n  appendNumber(number) {\r\n    if (number === \".\" && this.currentOperand.includes(\".\")) return; //to not add more than 1 period\r\n    this.currentOperand = this.currentOperand.toString() + number.toString(); //we convert everything to a string because javascript will try to add these as actual number so we need 1+1=2 instead of 1+1=11\r\n  }\r\n\r\n  chooseOperation(operation) {\r\n    if (this.currentOperand === \"\") return; // if we dont have a current operand we want to stop excuting the code(security)\r\n    if (this.previousOperand !== \"\") {\r\n      this.compute(); // so if we have 2 values and click another operation it will do the computation\r\n    }\r\n    this.operation = operation; // the calculator know what operation to use\r\n    this.previousOperand = this.currentOperand; //we are done typing the current number so we recycle it to the previous operand\r\n    this.currentOperand = \"\"; //clearing the value\r\n  }\r\n  //take our values inside our calculator and compute the value\r\n  compute() {\r\n    let computation;\r\n    const prev = parseFloat(this.previousOperand);\r\n    const current = parseFloat(this.currentOperand);\r\n    //if the user does not enter anything and we click equal we dont want the code to run\r\n    if (isNaN(prev)) return;\r\n    switch (this.operation) {\r\n      case \"+\":\r\n        computation = prev + current;\r\n        break;\r\n      case \"—\":\r\n        computation = prev - current;\r\n        break;\r\n      case \"X\":\r\n        computation = prev * current;\r\n        break;\r\n      case \"÷\":\r\n        computation = prev / current;\r\n        break;\r\n      case \"%\":\r\n        computation = prev / 100;\r\n\r\n        break;\r\n      default:\r\n        return;\r\n    }\r\n    this.currentOperand = computation;\r\n    this.operation = undefined;\r\n    this.previousOperand = \"\";\r\n    console.log(this.operation);\r\n  }\r\n  signChange() {\r\n    if (this.currentOperand == 0) return;\r\n\r\n    this.currentOperand = -this.currentOperand;\r\n  }\r\n\r\n  getDisplayNumber(number) {\r\n    //format the output\r\n    const stringNumber = number.toString(); //we convert the number to a string ,then we seperate the integer and decimal digits\r\n    const integerDigits = parseFloat(stringNumber.split(\".\")[0]);\r\n    const decimalDigits = stringNumber.split(\".\")[1];\r\n    let integerDisplay;\r\n    if (isNaN(integerDigits)) {\r\n      integerDisplay = \"\";\r\n    } else {\r\n      integerDisplay = integerDigits.toLocaleString(\"en\", {\r\n        maximumFractionDigits: 0,\r\n      }); //there can never be any decimal places after this value when it gets converted to a string with a bunch of commas\r\n    }\r\n    if (decimalDigits != null) {\r\n      //if the user did enter a period and have some numbers after it\r\n      return `${integerDisplay}.${decimalDigits}`;\r\n    } else {\r\n      return integerDisplay;\r\n    }\r\n  }\r\n\r\n  updateDisplay() {\r\n    this.currentOperandTextElement.innerText = this.getDisplayNumber(\r\n      this.currentOperand\r\n    );\r\n    if (this.operation != null) {\r\n      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(\r\n        this.previousOperand\r\n      )} ${this.operation}`;\r\n    } else {\r\n      this.previousOperandTextElement.innerText = \"\";\r\n    }\r\n  }\r\n}\r\nconst numberButtons = document.querySelectorAll(\"[data-number]\"); //we select all the  elements that match the data attribute string 'data-number'\r\nconst operationButtons = document.querySelectorAll(\"[data-operation]\"); //we select here all the operations buttons\r\nconst equalsButton = document.querySelector(\"[data-equals]\");\r\nconst allClearButton = document.querySelector(\"[data-all-clear]\");\r\nconst signChange = document.querySelector(\"[data-change-sign]\");\r\nconst previousOperandTextElement = document.querySelector(\r\n  \"[data-previous-operand]\"\r\n);\r\nconst currentOperandTextElement = document.querySelector(\r\n  \"[data-current-operand]\"\r\n);\r\n\r\nconst calculator = new Calculator(\r\n  previousOperandTextElement,\r\n  currentOperandTextElement\r\n); // we create a calculator\r\n\r\nnumberButtons.forEach((button) => {\r\n  //to loop over all the number buttons without creating a new array we use forEach\r\n  button.addEventListener(\"click\", () => {\r\n    calculator.appendNumber(button.innerText); //we add whatever inside the button that we click 1,2,3 ...\r\n    calculator.updateDisplay(); // every time we click on a number the display will be updated\r\n  });\r\n});\r\noperationButtons.forEach((button) => {\r\n  //to loop over all the opeartion buttons without creating a new array we use forEach\r\n  button.addEventListener(\"click\", () => {\r\n    calculator.chooseOperation(button.innerText); //we add whatever inside the button that we click +, x, /\r\n    calculator.updateDisplay(); // every time we click on an operation button the display will be updated\r\n  });\r\n});\r\n\r\nequalsButton.addEventListener(\"click\", (button) => {\r\n  calculator.compute();\r\n  calculator.updateDisplay();\r\n});\r\n\r\nallClearButton.addEventListener(\"click\", (button) => {\r\n  calculator.clear();\r\n  calculator.updateDisplay();\r\n});\r\n\r\nsignChange.addEventListener(\"click\", (button) => {\r\n  calculator.signChange();\r\n  calculator.updateDisplay();\r\n});\r\n\n\n//# sourceURL=webpack://calculator/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;