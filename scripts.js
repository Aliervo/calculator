let display = '';

const screen = document.querySelector('.screen p');
screen.textContent = 'Hello, Calculator!';

function updateScreen() {
  (display.indexOf('CLEAR') !== -1) ? //enable clear and delete
  display = '' :
  (display.indexOf('DELETE') !== -1)?
  display = display.slice (0, display.length - 7) :
  (display.indexOf('=') !== -1)? //keep equal sign from showing
  display = display.slice (0, display.indexOf('=')) :
    display = display;

  screen.textContent = `${display}`;
};

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => button.addEventListener('click', (e) => {
  (e.target.textContent !== 'DELETE') ?
  parse(display, e.target.textContent) :
  display += e.target.textContent;
  updateScreen();
}));

function add() {
  return arguments[0] + arguments[1];
};

function subtract() {
  return arguments[0] - arguments[1];
};

function multiply() {
  return arguments[0] * arguments[1];
};

function divide() {
  if (arguments[1] === 0) return 'Are you trying to break things?';
  return arguments[0] / arguments[1];
};

function operate(x, y, operator) {
  return (operator === '+') ? add(+x, +y) :
         (operator === '-') ? subtract(+x, +y) :
         (operator === '*') ? multiply(+x, +y) :
            divide(+x, +y);
};

function parse(string, input) {
  const operations = ['/', '*', '-', '+'];

  //keep decimals to one per number
  if (input === '.' && display.lastIndexOf('.') > display.indexOf('/') && display.lastIndexOf('.') > display.indexOf('*') && display.lastIndexOf('.') > display.indexOf('-') && display.lastIndexOf('.') > display.indexOf('+')) return;

  display = string.split(' ').join('')
  if (input !== '.') {
    operations.forEach(operator => {
      if (display.indexOf(operator, 1) !== -1) display =`${operate(string.split(operator)[0], string.split(operator)[1], operator)}`;
    });
  };

  if (input === '=') {
    if (operations.indexOf(string.split('').pop()) !== -1) {
      display = display.slice(0, display.length);
    };
  };

  display += input;
  updateScreen();
};

window.addEventListener('keydown', (e) => keybindings(e));

function keybindings(e) {
  keyPressed = e.key;
  switch (keyPressed) {
    case ('0'):
    case ('1'):
    case ('2'):
    case ('3'):
    case ('4'):
    case ('5'):
    case ('6'):
    case ('7'):
    case ('8'):
    case ('9'):
      display += keyPressed;
      break;
    case ('.'):
    case ('+'):
    case ('-'):
    case ('*'):
    case ('/'):
    case ('='):
      parse(display, keyPressed);
      break;
    case ('Enter'):
      parse(display, '=');
      break;
    case ('Backspace'):
      display += 'DELETE';
      break;
    case ('Escape'):
      parse(display, 'CLEAR');
      break;
    default:
      return;
  };
  updateScreen();
};

const operators = ['+','-','*','/','=']

function evaluate(string) { //evaluate an input string in reverse polish notation
  const inputArray = string.split(' ');
  const stack = [];

  inputArray.forEach(token => {
    if (operators.indexOf(token) !== -1) {
      let secondOperand = stack.pop();
      let firstOperand = stack.pop();
      let result = operate(firstOperand, secondOperand, token);
      stack.push(result);
    } else {
        stack.push(token);
    };
  });
  return stack.pop();
};

function shuntingYard(string) { //takes input in algebraic notation and returns
  const outputQueue = [];        // a string in reverse polish notation
  const operatorStack = [];
  const inputArray = string.split('');

  inputArray.forEach(token => {
    if (operators.indexOf(token) !== -1) {
      operatorStack.push(token);
    } else {
      outputQueue.push(token);
    };
  });

  operatorStack.forEach(token => {
    outputQueue.push(token);
  });
  return outputQueue.join(' ');
};
