'use strict';

import Calculator from "./calculator.js";

const display = document.querySelector('.display');
const deleteButton = document.querySelector('[data-clear]');

const calculator = new Calculator(display);

document.addEventListener('click', function(event) {
  if (event.target.hasAttribute('data-input')) {
    calculator.setOperand(event.target.textContent);
    calculator.updateDisplay();
  }

  if (event.target.hasAttribute('data-action')) {
    let operator = event.target.getAttribute('data-action');
    calculator.setOperation(operator);
  }

  if (event.target.hasAttribute('data-equals')) {
    calculator.compute();
    calculator.updateDisplay();
  }

  if (event.target.hasAttribute('data-clear')) {
    if (event.target.textContent === 'C') {
      calculator.clear();
      calculator.updateDisplay();
      event.target.textContent = 'AC';
    }
  }

  if (event.target.hasAttribute('data-sign')) {
    calculator.changeSign();
    calculator.updateDisplay();
  }

  if (event.target.hasAttribute('data-percent')) {
    calculator.calcPercentage();
    calculator.updateDisplay();
  }

  if (event.target.classList.contains('btn') && !event.target.hasAttribute('data-clear') && !event.target.hasAttribute('data-equals')) {
    deleteButton.textContent = 'C';
  }
});

document.addEventListener('keydown', event => {
  let numPattern = /[0-9]/g;
  let operatorPattern = /[+\-*\/]/g;

  if (event.key.match(numPattern) && !event.key.startsWith('F')) {
    event.preventDefault();
    calculator.setOperand(event.key);
    calculator.updateDisplay();
    deleteButton.textContent = 'C';
  }

  if (event.key === '.' || event.key === ',') {
    event.preventDefault();
    calculator.setOperand(event.key);
    calculator.updateDisplay();
    deleteButton.textContent = 'C';
  }

  if (event.key.match(operatorPattern)) {
    event.preventDefault();
    calculator.setOperation(event.key);
    calculator.updateDisplay();
    deleteButton.textContent = 'C';
  }

  if (event.key === "Enter" || event.key === '=') {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
    deleteButton.textContent = 'AC';
  }

  if (event.key === "Delete") {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
    deleteButton.textContent = 'AC';
  }
});
