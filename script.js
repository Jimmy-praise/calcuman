let inputs = [];
let currentOperator = '';
let finalAnswer = 0;


const resultDisplay = document.querySelector(".result");
const inputsDisplay = document.querySelector(".inputs");

function numbers(number) {
    if (resultDisplay.textContent.length == 12) {

    }
    else if (resultDisplay.textContent == finalAnswer) {
        resultDisplay.textContent = number.getAttribute('key');
        inputs = [];
        inputsDisplay.textContent = '';
    }
    else if (resultDisplay.textContent == '0' || resultDisplay.textContent == operate() ) {
        resultDisplay.textContent = number.getAttribute('key');
    } 
    else if (resultDisplay.textContent == operate().slice(1)) {
        resultDisplay.textContent = number.getAttribute('key');
    }
    else if (resultDisplay.textContent.includes('0.')) {
        resultDisplay.textContent += number.getAttribute('key');
    }
    else {
        resultDisplay.textContent += number.getAttribute('key');
    };
};
const numberButtons = document.querySelectorAll('.numbers');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {numbers(button)})
})

function operators(operator) {
    if (inputs.length == 0) {
        inputs.push(`+ ${resultDisplay.textContent}`);
        inputsDisplay.textContent = `${resultDisplay.textContent} ${operator.textContent} `;
        resultDisplay.textContent = operate();
    } 
    else if (resultDisplay.textContent == finalAnswer) {
        resultDisplay.textContent = operate().slice(1);
        inputs = [`+ ${resultDisplay.textContent}`];
        inputsDisplay.textContent = `${resultDisplay.textContent} ${operator.textContent} `
    }
    else if (resultDisplay.textContent == operate() || resultDisplay.textContent == operate().slice(1)) {
        inputsDisplay.textContent = inputsDisplay.textContent.slice(0, -2) + `${operator.textContent} `;
    }
    else {
        inputs.push(`${currentOperator} ${resultDisplay.textContent}`);
        inputsDisplay.textContent += `${resultDisplay.textContent} ${operator.textContent} `;
        resultDisplay.textContent = operate();
    };

    currentOperator = `${operator.getAttribute('key')}`;
}
const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach (operator => {
    operator.addEventListener('click', () => {
        operators(operator);
    });
});

function negative() {
    if (resultDisplay.textContent.includes('-')) {
        resultDisplay.textContent = resultDisplay.textContent.slice(1);
    } 
    else if (resultDisplay.textContent == 0 || resultDisplay.textContent == operate() || resultDisplay.textContent == finalAnswer) {
        
    }
    else if ((resultDisplay.textContent !== 0)) {
        resultDisplay.textContent = '-'.concat(resultDisplay.textContent);
    };
}
const negativeButton = document.querySelector('#negative');
negativeButton.addEventListener('click', negative);

function decimal() {
    if (resultDisplay.textContent == finalAnswer) {
        resultDisplay.textContent = '0.';
        inputs = [];
        inputsDisplay.textContent = '';
    } 
    else if (resultDisplay.textContent == '0' || resultDisplay.textContent == operate().slice(1)) {
        resultDisplay.textContent = '0.';
    } 
    else if (resultDisplay.textContent.length == 11 || resultDisplay.textContent.includes('.')) {

    } 
    else {
        resultDisplay.textContent += '.'
    };
}
const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', decimal)

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
        } else if (number.includes('* ')) {
            ans = multiply(a, b);
        } else if (number.includes('+ ')) {
            ans = add(a, b);
        } else if (number.includes('- ')) {
            ans = subtract(a, b);
        }
        return ans;
    }, 0)
    if (!(Number.isInteger(result))) {
        result = Math.round(result * 1000) / 1000;
    };
    if (result.toString().length > 12) {
        return result.toExponential(2);
    } else {
        return ` ${result} `;
        // spaces was added before result so that no number will be equal to operate() except operate() itself. It allows to calculate same numbers e.g. 2 x 22.
        // It was also added so that no number will be equal to operate().slice(1) execpt operate().slice(1) itself.
    }
}

function equal() {
    inputs.push(`${currentOperator} ${resultDisplay.textContent}`);
    inputsDisplay.textContent += `${resultDisplay.textContent}`;

    finalAnswer = operate();
    resultDisplay.textContent = finalAnswer;
}

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', equal);

const clearAll = document.querySelector('#clearAll');
clearAll.addEventListener('click', () => {
    inputs = [];
    inputsDisplay.textContent = ''
    resultDisplay.textContent = 0;
});

function backspace() {
    if (resultDisplay.textContent == finalAnswer) {
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
}
const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', backspace);

window.addEventListener('keydown', (e) => {
    let numEx = /^[0-9]/;
    let operatorEX = /\+|\-|\*|\//;

    if (e.key == 'Enter' || e.key == '=') {
        equal();
    } else if (numEx.test(e.key)) {
        let number = document.querySelector(`button[key='${e.key}']`);
        numbers(number);
    } else if (e.key == '.') {
        decimal();
    } else if (operatorEX.test(e.key)) {
        let operator = document.querySelector(`button[key='${e.key}']`);
        operators(operator);
    } else if (e.key == 'Backspace') {
        backspace();
    } else if (e.key == '_') {
        negative();
    }
})