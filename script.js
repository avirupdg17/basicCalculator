class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
    this.equalsflag = false;
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  appendNumber(number) {
    if (this.equalsflag) {
      this.currentOperand = "";
      this.equalsflag = false;
    }
    if (number == "." && this.currentOperand.includes(".")) return;
    //console.log(number);
    this.currentOperand += number;
    //console.log(this.currentOperand);
  }

  chooseOperation(operation) {
    if (!this.currentOperand) return;
    if (this.previousOperand) {
      this.compute();
    }
    this.operation = operation;
    //console.log("current");
    //console.log(this.currentOperand);
    this.previousOperand = this.currentOperand;
    //console.log(this.previousOperand);
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = "";
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    //console.log("string number");
    //console.log(stringNumber);
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerdisplay;
    if (isNaN(integerDigits)) {
      integerdisplay = "";
    } else {
      integerdisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (isNaN(decimalDigits)) {
      return integerdisplay;
    } else {
      return `${integerdisplay}.${decimalDigits}`;
    }
  }
  updateDisplay() {
    //console.log("previous");
    //console.log(this.previousOperand);
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    this.previousOperandTextElement.innerText =
      this.getDisplayNumber(this.previousOperand) + this.operation;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-upper]");
const currentOperandTextElement = document.querySelector("[data-lower]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.equalsflag = true;
});
