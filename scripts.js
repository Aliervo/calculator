let display = '';

const operators = ['+','-','*','/','=']
const screen = document.querySelector('.screen p');
const buttons = document.querySelectorAll('.button');

updateScreen('Hello, Calculator!');

function updateScreen(string) {
  screen.textContent = string
};

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
  return (arguments[1] === 0)       ?
  'Are you trying to break things?' :
  arguments[0] / arguments[1]       ;
};

function operate(x, y, operator) {
  return (operator === '+') ? add(+x, +y)      :
         (operator === '-') ? subtract(+x, +y) :
         (operator === '*') ? multiply(+x, +y) :
            divide(+x, +y)  ;
};

function parse(string, input) {
  //prevent double operators
  if (operators.indexOf(input) !== -1 &&
      display.lastIndexOf(input) === display.length -1) return;

  //keep decimals to one per number
  if (input === '.' &&
      display.lastIndexOf('.') > display.indexOf('/') &&
      display.lastIndexOf('.') > display.indexOf('*') &&
      display.lastIndexOf('.') > display.indexOf('-') &&
      display.lastIndexOf('.') > display.indexOf('+')) return;

  //display = string.split(' ').join('')
  if (input !== '.') display = evaluate(shuntingYard(display));

  display += input;

  (display.indexOf('=') !== -1)? //keep equal sign from showing
  display = display.slice (0, display.indexOf('=')) :
    display = display;

  updateScreen(display);
};

buttons.forEach((button) => {
  button.addEventListener('click', (e) => keybindings(e));
});

window.addEventListener('keydown', (e) => keybindings(e));

function keybindings(e) {
  const keyPressed = e.key;
  const clicked = e.target.textContent;
  const input = (keyPressed != undefined) ? keyPressed: clicked;

  switch (input) {
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
      display += input;
      break;
    case ('.'):
    case ('+'):
    case ('-'):
    case ('*'):
    case ('/'):
    case ('='):
      parse(display, input);
      break;
    case ('Enter'):
      parse(display, '=');
      break;
    case ('Backspace'):
    case ('DELETE'):
      display = display.slice(0, display.length - 1);
      break;
    case ('Escape'):
    case ('CLEAR'):
      display = '';
      break;
    default:
      return;
  };
  updateScreen(display);
};

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
    if (operators.indexOf(token) !== -1 && outputQueue.length > 0) {
      operatorStack.push(token);
    } else {
      outputQueue.push(token);
    };
  });

  operatorStack.forEach(token => {
    outputQueue.push(token);
  });
  if (outputQueue[0] == '-') { //enable leading "-" to be interpreted as
    outputQueue.shift();       //a negative sign
    outputQueue[0] *= -1;
    return outputQueue.join(' ');
  } else {
    return outputQueue.join(' ');
  };
};
