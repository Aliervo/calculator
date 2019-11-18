let display = '';

const screen = document.querySelector('.screen p');
screen.textContent = 'Hello, Calculator!';

function updateScreen() {
  screen.textContent = `${display}`;
};

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => button.addEventListener('click', (e) => {
  (e.target.parentElement.classList.length < 2) ? //check if the clicked is a number or an operator.
  parse(display, e) :
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

function operate(x, operator, y) {
  let operation = (operator === '+') ? add(+x, +y) :
         (operator === '-') ? subtract(+x, +y) :
         (operator === '*') ? multiply(+x, +y) :
            divide(+x, +y);
  return operation;
};

function parse(string, e) {
  let operations = ['/', '*', '-', '+'];
  
  //keep decimals to one per number
  if (e.target.textContent === '.' && display.lastIndexOf('.') > display.indexOf('/') && display.lastIndexOf('.') > display.indexOf('*') && display.lastIndexOf('.') > display.indexOf('-') && display.lastIndexOf('.') > display.indexOf('+')) return;
  /*
  if (e.target.textContent === '.' && display.indexOf('.') !== -1 && (display.indexOf('/') === -1 || display.indexOf('*') === -1 || display.indexOf('-') === -1 || display.indexOf('+') === -1)) return;
  */
  display = string.split(' ').join('')
  if (e.target.textContent !== '.') {
    operations.forEach(operator => {
      if (display.indexOf(operator, 1) !== -1) display =`${operate(string.split(operator)[0], operator, string.split(operator)[1])}`;
    });
  };
  
  display += e.target.textContent;
  (display.indexOf('CLEAR') !== -1) ? //enable clear and delete
  display = '' :
  (display.indexOf('DELETE') !== -1)? 
  display = display.slice (0, display.indexOf('DELETE') -1) :
  (display.indexOf('=') !== -1)? //keep equal sign from showing
  display = display.slice (0, display.indexOf('=')) :
    display = display;
  updateScreen();
};
