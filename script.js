const audio = new Audio("sound/click_button.mp3");

let display= document.querySelector(".sum");
let history = document.querySelector(".calc-history");
let but = document.querySelectorAll(".btn");
let resetHistoryBtn = document.querySelector(".reset-history");

let wrapper = document.querySelector(".calculator-wrapper");
let toggleBtn = document.querySelector(".toggleBtn");
let historyBoard = document.querySelector(".history-board");

let stack = [];

function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}
toggleBtn.addEventListener("click", function () {
    toggleClass(wrapper, "open");
});
historyBoard.addEventListener("click", function () {
    toggleClass(wrapper, "open-window");
});

// toggleBtn.addEventListener("click", function () {
//     if (wrapper.classList.contains("open")) {
//         wrapper.classList.remove("open");
//     } else {
//         wrapper.classList.add("open");
//     }
// });
// historyBoard.addEventListener("click", function () {
//     if (wrapper.classList.contains("open-window")) {
//         wrapper.classList.remove("open-window");
//     } else {
//         wrapper.classList.add("open-window");
//     }
// });

document.addEventListener("keydown", function(event) {
    let key = event.key;
    switch (key) {
        case "+":
            display.innerText += key;
            stack.push(parseFloat(key));
            break;
        case "-":
            display.innerText += key;
            stack.push(parseFloat(key));
            break;
        case "x":
            display.innerText += key;
            stack.push(parseFloat(key));
            break;
        case "/":
            display.innerText += key;
            stack.push(parseFloat(key));
            break;
        case "%":
            display.innerText += key;
            stack.push(parseFloat(key));
            break;
        case ".":
            if (!display.innerText.includes(".")) {
                display.innerText += key;
            }
            break;
        case "Enter":
            display.innerText = equals();
            break;
        case "Escape":
            display.innerText = "0";
            stack = [];
            break;
        case "Backspace":
            let currentText = display.innerText;
            display.innerText = currentText.slice(0, -1);
            break;
        default:
            if (!Number.isNaN(Number(key))) {
                if (display.innerText === "0" && key !== ".") {
                    display.innerText = key;
                } else {
                    display.innerText += key;
                }
                reduce(display);
                stack.push(parseFloat(key));
            }
            break;
    }
});

resetHistoryBtn.addEventListener("click", function () {
    history.innerText = "";
    localStorage.removeItem('history');
});

function playSound() {
    audio.play();
}

// Function for saving history to local storage
function saveHistory(expression) {
    let historyArray = [];
    let currentHistory = localStorage.getItem('history');
    if (currentHistory) {
        historyArray = JSON.parse(currentHistory);
    }
    historyArray.push({ expression });
    localStorage.setItem('history', JSON.stringify(historyArray));
}

// Function for downloading history from local storage
function loadHistory() {
    let currentHistory = localStorage.getItem('history');
    if (currentHistory) {
        currentHistory = JSON.parse(currentHistory);
        currentHistory.forEach(item => {
            history.innerText += item.expression + ' = ' + '\n';
        });
    }
}

//Function to reduce font
function reduce(element) {
    if (element.innerText.length > 8) {
        element.style.fontSize = "30px";
    } else {
        element.style.fontSize = "";
    }
    if (element.innerText.length > 16) {
        element.innerText = element.innerText.slice(0, 16);
    }
}
//Functions for the calculator
function plus (a, b) {
    return a + b;
}
function minus (a, b) {
    return a - b;
}
function multi(a, b) {
    return a * b;
}
function division (a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "Error!"
    }
}
function percent(a) {
    return a / 100;
}
function cube(a) {
    return a * a * a;
}
function square(a) {
    return a * a;
}
function root(a) {
    return a ** 0.5;
}
function sin(a) {
    a = a % (2 * Math.PI); // Приводим значение угла к диапазону от 0 до 2π
    let result = 0;

    for (let n = 0; n <= 20; n++) {
        result += ((-1) ** n) * (x ** (2 * n + 1)) / factorial(2 * n + 1);
    }

    return result;
}
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
function cos(a) {
    return sin(a + Math.PI / 2);
}
function tan(a) {
    return sin(a) / cos(a);
}
function lg(a) {
    return Math.log10(a);
}
function  ln(a) {
    return Math.log(a);
}

let isEqualSignPressed = false;
function equals() {
    let result = null;
    let sign = stack[1];
    let num1 = parseFloat(stack[0]);
    let num2 = parseFloat(stack[2]);

    if (isEqualSignPressed) {
        num1 = parseFloat(result);
        num2 = parseFloat(stack[2]);
    }
    console.log(sign, num1, num2);
    switch (sign) {
        case "+":
            result = plus(num1, num2);
            break;
        case "-":
            result = minus(num1, num2);
            break;
        case "x":
            result = multi(num1, num2);
            break;
        case "÷":
            result = division(num1, num2);
            break;
    }
    if (result) {
        result = parseFloat(result.toFixed(3));
    }

    history.innerText += num1 + " " + sign + " " + num2 + " = " + result + "\n";
    isEqualSignPressed = true;
    saveHistory();
    stack = [result, sign, num2];6
    isEqualSignPressed = false;
    return result;
}

function buttonProcessing(event) {
    audio.play();
    switch (event.target.innerText) {
        case "+": case "-": case "x": case "÷":
            stack.push(display.innerText);
            stack.push(event.target.innerText);
            display.innerText = "";
            break;
        case "sin":
            display.innerText = sin(parseFloat(display.innerText));
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "cos":
            display.innerText = Math.cos(parseFloat(display.innerText));
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "tan":
            display.innerText = Math.tan(parseFloat(display.innerText));
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "%":
            display.innerText = percent(display.innerText);
            history.innerText += display.innerText;
            break;
        case "+/-":
            if (display.innerText[0] === "-") {
                display.innerText = display.innerText.slice(1);
            } else {
                display.innerText = '-' + display.innerText;
            }
            break;
        case "x²":
            display.innerText = square(display.innerText);
            history.innerText += display.innerText + "\n";
            break;
        case "x³":
            display.innerText = cube(display.innerText);
            history.innerText += display.innerText + "\n";
            break;
        case "log":
            display.innerText = lg(parseFloat(display.innerText));
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "ln":
            display.innerText = ln(parseFloat(display.innerText));
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "√":
            display.innerText = root(display.innerText);
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "π":
            display.innerText = Math.PI;
            history.innerText += display.innerText + "\n";
            reduce(display);
            break;
        case "=":
            stack.push(display.innerText);
            display.innerText = equals();
            break;
        case "AC":
            stack = [];
            display.innerText = "0";
            break;
        default:
            if (display.innerText === "0" && event.target.innerText !== ".") {
                display.innerText = event.target.innerText;
            } else {
                display.innerText += event.target.innerText;
            }
            reduce(display);
    }
}

but.forEach((item) => {
    item.addEventListener("click", buttonProcessing);
});
loadHistory();

const buttons = document.getElementsByClassName("btn");
Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener("click", function () {
        audio.play();
    });
});
