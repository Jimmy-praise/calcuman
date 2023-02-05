const display = document.querySelector(".input-display")
const numberButtons = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent == 0) {
            display.textContent = button.textContent
        } else {
            display.textContent += button.textContent
        };
    });
});

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