let inputs = [];
let currentOperator = '';

const resultDisplay = document.querySelector(".result");
const inputsDisplay = document.querySelector(".inputs");

const numberButtons = document.querySelectorAll('.numbers');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplay.textContent.length == 12) {

        }
        else if (resultDisplay.textContent.includes('0.')) {
            resultDisplay.textContent += button.getAttribute('key');
        }
        else if (resultDisplay.textContent == result) {
            resultDisplay.textContent = button.getAttribute('key');
            inputs = [];
            inputsDisplay.textContent = '';
        }
        else if (resultDisplay.textContent == '0' || resultDisplay.textContent == operate()) {
            resultDisplay.textContent = button.getAttribute('key');
        } else {
            resultDisplay.textContent += button.getAttribute('key');
        };
    });
});

const negative = document.querySelector('#negative');

negative.addEventListener('click', () => {
    if (resultDisplay.textContent.includes('-')) {
        resultDisplay.textContent = resultDisplay.textContent.slice(1);
    }
    else if (resultDisplay.textContent == result) {
        resultDisplay.textContent = negative.getAttribute('key');
        inputs = [];
    }
    else if (resultDisplay.textContent == 0 || resultDisplay.textContent == operate()) {
        resultDisplay.textContent = negative.getAttribute('key');
    } 
    else if ((resultDisplay.textContent !== 0)) {
        resultDisplay.textContent = negative.getAttribute('key').concat(resultDisplay.textContent);
    };
});

const decimal = document.querySelector('#decimal');

decimal.addEventListener('click', () => {
    if (resultDisplay.textContent == result) {
        resultDisplay.textContent = '0.';
        inputs = [];
        inputsDisplay.textContent = '';
    }
    else if (resultDisplay.textContent.length == 11 || resultDisplay.textContent.includes('.')) {

    }
    else if (resultDisplay.textContent == '0' || resultDisplay.textContent == operate()) {
        resultDisplay.textContent += '.';
    } else {
        resultDisplay.textContent += decimal.getAttribute('key')
    };
})

const operators = document.querySelectorAll('.operator');

operators.forEach (operator => {
    operator.addEventListener('click', () => {
        if (inputs.length == 0) {
            inputs.push(`+ ${resultDisplay.textContent}`);
        } else {
            inputs.push(`${currentOperator} ${resultDisplay.textContent}`);
        };

        inputsDisplay.textContent += `${resultDisplay.textContent} ${operator.textContent} `

        currentOperator = `${operator.textContent}`;
        resultDisplay.textContent = operate();

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

function operate() {
    let result = inputs.reduce((ans, number) => {
        a = ans;
        b = parseFloat(number.slice(2));

        if (number.includes('/ ')) {
            ans = divide(a, b);
        } else if (number.includes('x ')) {
            ans = multiply(a, b);
        } else if (number.includes('+ ')) {
            ans = add(a, b);
        } else if (number.includes('- ')) {
            ans = subtract(a, b);
        }
        return ans;
    }, 0)
    if (result.toString().length > 12) {
        return result.toExponential(9);
    } else {
        return result;
    }
}

const equal = document.querySelector('#equal');

let result = '';

equal.addEventListener('click', () => {
    result = operate();
    resultDisplay.textContent = result;
})

const clearAll = document.querySelector('#clearAll');
const backspace = document.querySelector('#backspace')

clearAll.addEventListener('click', () => {
    inputs = [];
    inputsDisplay.textContent = ''
    resultDisplay.textContent = 0;
});
backspace.addEventListener('click', () => {
    if (resultDisplay.textContent == result) {
        resultDisplay.textContent = 0;
        inputs = [];
        inputsDisplay.textContent = ''
    }
    else if (resultDisplay.textContent.length == 1) {
        resultDisplay.textContent = 0;
    } 
    else {
        resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
    }
})