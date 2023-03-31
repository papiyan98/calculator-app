'use strict';

import Calculator from "./calculator.js";

const display = document.querySelector('.display');
const signKey = document.querySelector('[data-sign]');
const equalKey = document.querySelector('[data-equals]');
const percentKey = document.querySelector('[data-percent]');
const deleteKey = document.querySelector('[data-clear]');

const allKeys = document.querySelectorAll('.btn');
const inputKeys = document.querySelectorAll('[data-input]');
const actionKeys = document.querySelectorAll('[data-action]');

const calculator = new Calculator(display);

inputKeys.forEach(key => {
  key.addEventListener('click', event => {
    calculator.setOperand(event.target.textContent);
    calculator.updateDisplay();
  });
});

actionKeys.forEach(key => {
  key.addEventListener('click', event => {
    calculator.setOperation(event.target.getAttribute('data-action'));
  });
});

allKeys.forEach(key => {
  key.addEventListener('click', event => {
    if (!event.target.hasAttribute('data-clear') && !event.target.hasAttribute('data-equals')) {
      deleteKey.textContent = 'C';
    }
  })
});

deleteKey.addEventListener('click', () => {
  if (deleteKey.textContent === 'C') {
    calculator.delete();
    calculator.updateDisplay();
    deleteKey.textContent = 'AC';
  } else {
    calculator.clear();
    calculator.updateDisplay();
  }
});

equalKey.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

signKey.addEventListener('click', () => {
  calculator.changeSign();
  calculator.updateDisplay();
});

percentKey.addEventListener('click', () => {
  calculator.calcPercentage();
  calculator.updateDisplay();
});

document.addEventListener('keydown', event => {
  let numPattern = /[0-9]/g;
  let operatorPattern = /[+\-*\/]/g;

  if (event.key.match(numPattern) && !event.key.startsWith('F')) {
    event.preventDefault();
    calculator.setOperand(event.key);
    calculator.updateDisplay();
    deleteKey.textContent = 'C';
  }

  if (event.key === '.' || event.key === ',') {
    event.preventDefault();
    calculator.setOperand(event.key);
    calculator.updateDisplay();
    deleteKey.textContent = 'C';
  }

  if (event.key.match(operatorPattern)) {
    event.preventDefault();
    calculator.setOperation(event.key);
    calculator.updateDisplay();
    deleteKey.textContent = 'C';
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
    deleteKey.textContent = 'AC';
  }

  if (event.key === "Delete") {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
    deleteKey.textContent = 'AC';
  }
});