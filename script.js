const display = document.querySelector(".input-display")
const numberButtons = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')

let inputs = [];
let currentOperator = ''

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent == 0) {
            display.textContent = button.textContent
        } else {
            display.textContent += button.textContent
        };
    });
});

operators.forEach (operator => {
    operator.addEventListener('click', () => {
        if (inputs.length == 0) {
            inputs.push(`${display.textContent}`);
        } else {
            inputs.push(`${currentOperator} ${display.textContent}`);
        }
        currentOperator = `${operator.textContent}`
        display.textContent = 0;

    })
})

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};
