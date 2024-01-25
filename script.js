let display= document.querySelector(".sum");
let history = document.querySelector(".calc-history");
let but = document.querySelectorAll(".btn");
let resetHistoryBtn = document.querySelector(".reset-history");
let stack = [];

document.addEventListener("keydown", function(event) {
    let key = event.key; // Получаем нажатую клавишу

    // Проверка является ли нажатая клавиша цифрой или знаком
    if (!Number.isNaN(Number(key))|| key === "+" || key === "-" || key === "x" || key === "/" || key === "%") {
        // Обрабатываем ввод цифры или знака
        if (display.innerText === "0" && key !== ".") {
            display.innerText = key;
        } else {
            display.innerText += key;
        }

        stack.push(parseFloat(key));
        // sizeSymbol(display);
    }
    if (display.innerText === "0") {
        display.innerText = event.target.innerText;
    }
    // Проверка, была ли нажата клавиша "Enter"
    if (key === "Enter") {
        display.innerText = equals();
    }
    // Проверка, была ли нажата клавиша "Escape"
    if (key === "Escape") {
        display.innerText = "0"; // Обнуление калькулятор
        stack = [];
    }
    // Проверка для удаления последнего символа или цифры
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
// Функция для сохранения истории в локальное хранилище
function saveHistory(expression, result) {
    let currentHistory = localStorage.getItem('history');
    if (currentHistory) {
        currentHistory = JSON.parse(currentHistory);
    } else {
        currentHistory = [];
    }
    currentHistory.push({ expression, result, });
    localStorage.setItem('history', JSON.stringify(currentHistory));
}

// Функция для загрузки истории из локального хранилища
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
    if (element.innerText.length > 8) {
        element.style.fontSize = "30px";
    }
    if (element.innerText.length > 17) {
        element.innerText = element.innerText.slice(0, 17);
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

//TODO: Переписать функцию equals

function equals() {
    let expression = stack.join("") + display.innerText;
    let result = null;
    let sign = stack[1];
    let num1 = parseFloat(stack[0]);
    let num2 = parseFloat(display.innerText);
    console.log (sign, num1, num2);
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
        history.innerText += expression + " = " + result + "\n";
        saveHistory(expression, result);
        // stack.push(result);   //добавляет элемент последним в существующий
        display.innerText = result;
        return result;
    }
    else {
        return 'Error';
    }
}


// function equals() {
//     let expression = currentExpression + display.innerText;
//     let result = null;
//     let sign = currentExpression.slice(-1);
//     let num1 = parseFloat(currentExpression.slice(0, currentExpression.length -1));
//     let num2 = parseFloat(display.innerText);
//     console.log (sign, num1, num2);
//     console.log(currentExpression)
//     switch (sign) {
//         case "+":
//             result = plus(num1, num2);
//             break;
//         case "-":
//             result = minus(num1, num2);
//             break;
//         case "x":
//             result = multi(num1, num2);
//             break;
//         case "/":
//             result = division(num1, num2);
//             break;
//     }
//     if (result) {
//         result = parseFloat(result.toFixed(3));
//         history.innerText += expression + " = " + result + "\n";
//         saveHistory(expression, result);
//         currentExpression = "";
//         display.innerText = result;
//         return result;
//     } else {
//         return 'Error';
//     }
// }

// function updateExpression(operator) {
//     if (currentExpression === "") {
//         currentExpression += display.innerText + " " + operator;
//     } else {
//         currentExpression += display.innerText;
//         currentExpression += " " + operator;
//     }
//     stack.push(display.innerText + " " + operator);
// }
but.forEach((item)=> {
    item.addEventListener("click", function (event) {
        switch (event.target.innerText) {
            case "+":
                stack.push(display.innerText);
                stack.push(event.target.innerText);
                display.innerText = "";
                break;
            case "-":
                stack.push(display.innerText);
                stack.push(event.target.innerText);
                display.innerText = "";
                break;
            case "x":
                stack.push(display.innerText);
                stack.push(event.target.innerText);
                display.innerText = "";
                break;
            case "÷":
                stack.push(display.innerText);
                stack.push(event.target.innerText);
                display.innerText = "";
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
        }
        console.log(stack);
        console.log(typeof stack[stack.length - 1]);
        // secondWindow.innerText += event.target.innerText;
        sizeSymbol(display);
    });
});

loadHistory();
resetHistoryBtn.addEventListener("click", function () {
    history.innerText = ""; // Очистить историю вычислений
    localStorage.removeItem('history'); // Удалить данные из localStorage
});
