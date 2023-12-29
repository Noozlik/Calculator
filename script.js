let display= document.querySelector(".sum");
let history = document.querySelector(".calc-history");
let but = document.querySelectorAll(".btn");
let stack = [];

document.addEventListener("keydown", function(event) {
    let key = event.key;
    if (!Number.isNaN(Number(key))|| key === "+" || key === "-" || key === "x" || key === "/" || key === "%") {
        if (display.innerText === "0" && key !== ".") {
            display.innerText = key;
        } else {
            display.innerText += key;
        }

        stack.push(parseFloat(key));
        sizeSymbol(display);
    }
    if (display.innerText === "0") {
        display.innerText = event.target.innerText;
    }
    if (key === "Enter") {
        display.innerText = equals();
    }
    if (key === "Escape") {
        display.innerText = "0";
        stack = [];
    }
    if (key === "Backspace") {
        let currentText = display.innerText;
        display.innerText = currentText.slice(0, -1);
    }
    if (key === "." || key === "ю") {
        if (!display.innerText.includes(".")) {
            display.innerText += ".";
        }
    }
});
function saveHistory(expression, result) {
    let currentHistory = localStorage.getItem('history');
    if (currentHistory) {
        currentHistory = JSON.parse(currentHistory);
    } else {
        currentHistory = [];
    }
    let limitedExpression = expression.replace(/[+\-x/]/g, (match) => {
        return match.slice(0, 7);
    });
    currentHistory.push({ expression, result });
    localStorage.setItem('history', JSON.stringify(currentHistory));
}

function loadHistory() {
    let currentHistory = localStorage.getItem('history');
    if (currentHistory) {
        currentHistory = JSON.parse(currentHistory);
        currentHistory.forEach(item => {
            history.innerText += item.expression + ' = ' + item.result + '\n';
        });
    }
}

function sizeSymbol (element) {
    if (element.innerText.length > 7) {
        element.style.fontSize = "45px";
    }
    if (element.innerText.length > 11) {
        element.innerText = element.innerText.slice(0, 11);
    }
}

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

function equals() {
    let expression = display.innerText;
    let result = null;
    let sign = ['+','-','x','/'];
    for (let i = 0; i < sign.length; i++) {
        let signIndex = expression.indexOf(sign[i]);
        if (signIndex !== -1) {
            let num1 = parseFloat(expression.slice(0, signIndex));
            let num2 = parseFloat(expression.slice(signIndex + 1));
            switch (sign[i]) {
                case "+":
                    result = plus(num1, num2);
                    break;
                case "-":
                    result = minus(num1, num2);
                    break;
                case "x":
                    result = multi(num1, num2);
                    break;
                case "/":
                    result = division(num1, num2);
                    break;
            }
            break;
        }
    }
    if (typeof result === 'number') {
        history.innerText += expression + " = " + result + "\n";
        saveHistory(expression, result);
        return result;
    } else {
        return 'Error';
    }
}

but.forEach((item)=> {
    item.addEventListener("click", function (event) {
        switch (event.target.innerText) {
            case "+":
            case "-":
            case "x":
            case "/":
                if (
                    stack[stack.length - 1] !== "+" &&
                    stack[stack.length - 1] !== "-" &&
                    stack[stack.length - 1] !== "*" &&
                    stack[stack.length - 1] !== "/"
                ) {
                    display.innerText += event.target.innerText;
                }
                break;
            case "%":
                display.innerText = percent(parseFloat(display.innerText));
                break;
            case "+/-":
                if (display.innerText[0] === "-") {
                    display.innerText = display.innerText.slice(1);
                } else {
                    display.innerText = '-' + display.innerText;
                }
                break;
            case "=":
                display.innerText = equals();
                stack = [];
                break;
            case "AC":
                display.innerText = "0";
                stack = [];
                break;
            default:
                if (display.innerText === "0" && event.target.innerText !== ".") {
                    display.innerText = event.target.innerText;
                } else {
                        display.innerText += event.target.innerText;
                    }
                }
        stack.push(parseFloat(event.target.innerText));
        sizeSymbol(display);
    });
});

loadHistory();

let resetBtn = document.querySelector(".reset-history");
resetBtn.addEventListener("click", function () {
    history.innerText = "";
    localStorage.removeItem('history');
});
