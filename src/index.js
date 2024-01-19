//so to store the information of the operand and all the other methods
// i decided to create a calculator class

class Calculator {
  constructor(
    previousOperandTextElement,
    currentOperandTextElement //because we need to know where to place the display text of our calculator
  ) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); // we want to clear all the inputs  as soon as we create a new calculator
  }
  // the operations

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined; // beacause we dont have any operation selected if we clear
  }
  // it add the number clicked by the user

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; //to not add more than 1 period
    this.currentOperand = this.currentOperand.toString() + number.toString(); //we convert everything to a string because javascript will try to add these as actual number so we need 1+1=2 instead of 1+1=11
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return; // if we dont have a current operand we want to stop excuting the code(security)
    if (this.previousOperand !== "") {
      this.compute(); // so if we have 2 values and click another operation it will do the computation
    }
    this.operation = operation; // the calculator know what operation to use
    this.previousOperand = this.currentOperand; //we are done typing the current number so we recycle it to the previous operand
    this.currentOperand = ""; //clearing the value
  }
  //take our values inside our calculator and compute the value
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //if the user does not enter anything and we click equal we dont want the code to run
    if (isNaN(prev)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "—":
        computation = prev - current;
        break;
      case "X":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "%":
        computation = prev / 100;

        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
    console.log(this.operation);
  }
  signChange() {
    if (this.currentOperand == 0) return;

    this.currentOperand = -this.currentOperand;
  }

  getDisplayNumber(number) {
    //format the output
    const stringNumber = number.toString(); //we convert the number to a string ,then we seperate the integer and decimal digits
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      }); //there can never be any decimal places after this value when it gets converted to a string with a bunch of commas
    }
    if (decimalDigits != null) {
      //if the user did enter a period and have some numbers after it
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
const numberButtons = document.querySelectorAll("[data-number]"); //we select all the  elements that match the data attribute string 'data-number'
const operationButtons = document.querySelectorAll("[data-operation]"); //we select here all the operations buttons
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const signChange = document.querySelector("[data-change-sign]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
); // we create a calculator

numberButtons.forEach((button) => {
  //to loop over all the number buttons without creating a new array we use forEach
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText); //we add whatever inside the button that we click 1,2,3 ...
    calculator.updateDisplay(); // every time we click on a number the display will be updated
  });
});
operationButtons.forEach((button) => {
  //to loop over all the opeartion buttons without creating a new array we use forEach
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText); //we add whatever inside the button that we click +, x, /
    calculator.updateDisplay(); // every time we click on an operation button the display will be updated
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

signChange.addEventListener("click", (button) => {
  calculator.signChange();
  calculator.updateDisplay();
});
