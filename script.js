const display = document.querySelector(".input-display")
const numberButtons = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')

let inputs = [];

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent == 0) {
            display.textContent = button.textContent
        } else {
            display.textContent += button.textContent
        };
    });
});

operators.forEach (button => {
    button.addEventListener('click', () => {
        inputs.push(`${display.textContent}${button.textContent}`);
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

function operate(params) {
    
}