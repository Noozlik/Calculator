let display= document.querySelector(".sum");
let history = document.querySelector(".calc-history");
let but = document.querySelectorAll(".btn");
let stack = [];

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
    history.innerText += expression + " = " + result + "\n";
    return result;
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
        stack.push(event.target.innerText);
        sizeSymbol(display);
    });
});
