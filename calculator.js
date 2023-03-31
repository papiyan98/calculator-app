export default class Calculator {
  constructor(display) {
    this.display = display;
    this.current = '0';
    this.previous = null;
    this.operation = null;
  }

  updateDisplay() {
    let temp = this.current;

    if (this.current.length <= 8) {
      this.display.style.fontSize = '60px';
    } else if (this.current.length <= 12) {
      this.display.style.fontSize = '40px';
    } else {
      this.display.style.fontSize = '40px';
      temp = Number(this.current).toExponential(7); 
    }

    if (temp.includes('.')) {
      let index = temp.indexOf('.');
      this.display.textContent = temp.slice(0, index) + ',' + temp.slice(index + 1, temp.length);
    } else {
      this.display.textContent = temp;
    }
  }

  clear() {
    this.current = '0';
    this.previous = null;
    this.operation = null;
  }

  delete() {
    this.current = '0';
  }

  changeSign() {
    this.current = String(0 - this.current);
  }

  calcPercentage() {
    if (this.previous) {
      this.current = String(parseFloat(this.previous) * parseFloat(this.current) / 100);
    } else {
      // default calc 1% of current value
      this.current = String(parseFloat(this.current) * 0.01);
    }
  }

  setOperand(input) {
    if ((input === ',' || input === '.') && this.current.includes('.')) return;
    if (this.current.length == 12) return;

    if (this.current == '0') {
      (input === ',' || input === '.') ? this.current += '.' : this.current = String(input);
    } else {
      (input === ',' || input === '.') ? this.current += '.' : this.current += String(input);
    }
  }

  setOperation(action) {
    if (this.previous) {
      this.compute();
      this.updateDisplay();
    }

    this.operation = action;

    this.previous = this.current;
    this.current = '0';
  }

  compute() {
    if (this.previous) {
      let temp;
      switch(this.operation) {
        case '+':
          if (this.previous.includes('.') || this.current.includes('.')) {
            let toInt = (this.previous.length > this.current.length) ? Math.pow(10, this.previous.length - 2) : Math.pow(10, this.current.length - 2);
            temp = (parseFloat(this.previous) * toInt + parseFloat(this.current) * toInt) / toInt;
          } else {
            temp = parseFloat(this.previous) + parseFloat(this.current);
          }
          this.current = String(temp);
          break;
        case '-':
          if (this.previous.includes('.') || this.current.includes('.')) {
            let toInt = (this.previous.length > this.current.length) ? Math.pow(10, this.previous.length - 2) : Math.pow(10, this.current.length - 2);
            temp = (parseFloat(this.previous) * toInt - parseFloat(this.current) * toInt) / toInt;
          } else {
            temp = parseFloat(this.previous) - parseFloat(this.current);
          }
          this.current = String(temp);
          break;
        case '*':
          if (this.previous.includes('.') || this.current.includes('.')) {
            temp = (parseFloat(this.previous) * Math.pow(10, this.previous.length)) * (parseFloat(this.current) * Math.pow(10, this.current.length)) / (Math.pow(10, this.previous.length) * Math.pow(10, this.current.length));
          } else {
            temp = parseFloat(this.previous) * parseFloat(this.current);
          }
          this.current = String(temp);
          break;
        case '/':
          // toPrecision() returns string, so no need to convert result manually
          this.current = Number((parseFloat(this.previous) / parseFloat(this.current)).toFixed(10)).toPrecision();;
          break;
      }
    }
  }
}