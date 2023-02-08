const display = document.querySelector(".input-display")
const numberButtons = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')

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
            inputs.push(`+ ${display.textContent}`);
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

function operate() {
    return inputs.reduce((ans, number) => {
        a = ans;
        b = parseInt(number.slice(2));

        if (number.includes('/ ')) {
            ans = divide(a, b);
        } else if (number.includes('x ')) {
            ans = multiply(a, b);
        } else if (number.includes('+ ')) {
            ans = add(a, b);
        } else if (number.includes('- ')) {
            ans = subtract(a, b);
        }
        return ans
    }, 0)
}

equal.addEventListener('click', () => {
    display.textContent = operate()
})