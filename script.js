const display = document.querySelector(".input-display")
const numberButtons = document.querySelectorAll('.numbers')

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent == 0) {
            display.textContent = button.textContent
        } else {
            display.textContent += button.textContent
        };
    });
});

