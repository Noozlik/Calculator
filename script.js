let display= document.querySelector(".sum");
let history = document.querySelector(".calc-history");
/*let buttons = Array.from(document.querySelectorAll(".btn"));*/
let but = document.querySelectorAll(".btn");
// const arrayNumbers = ['0','1','2','3','4','6,','7','8','9'];
// const arraySign = ['+','-','*','/','%'];
let stack = [];

// function push(item) {
//     stack.push(item);
// }

// function look() {
//     return stack[stack.length - 1];
// }

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

// function plusMinus(a) {
//     return -1 * a;
// }

function percent (a, b) {
    return (a * b) / 100;
}

function equals() {
    let expression = display.innerText;
    let result = null;
    let sign = ['+','-','x','/','%'];
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
                case "%":
                    result = percent(num1, num2);
                    break;
            }
            break;
        }
    }
    // history.innerText = "";
    history.innerText += expression + " = " + result + "\n";
    return result;
}

// function equals() {
//     let expression = display.innerText;
//     let result = null;
//     for (let i = 0; i < arraySign.length; i++) {
//         let signIndex = expression.indexOf(arraySign[i]);
//         if (signIndex !== -1) {
//             let num1 = parseFloat(expression.slice(0, signIndex));
//             let num2 = parseFloat(expression.slice(signIndex + 1));
//             switch (arraySign[i]) {
//                 case "+":
//                     result = plus(num1, num2);
//                     break;
//                 case "-":
//                     result = minus(num1, num2);
//                     break;
//                 case "*":
//                     result = multi(num1, num2);
//                     break;
//                 case "/":
//                     result = division(num1, num2);
//                     break;
//                 case "%":
//                     result = percent(num1, num2);
//                     break;
//             }
//             break;
//         }
//     }
//     return result;
// }

but.forEach((item)=> {
    item.addEventListener("click", function (event) {
        switch (event.target.innerText) {
            case "+":
            case "-":
            case "x":
            case "/":
            case "%":
                if (stack.pop() !== "+" && stack.pop() !== "-" && stack.pop() !== "*" && stack.pop() !== "/") {
                    display.innerText += event.target.innerText;
                }
                break;
            case "+/-":
                if (display.innerText[0] === "-") {
                    display.innerText = display.innerText.slice(1);
                } else {
                    display.innerText = '-' + display.innerText;
                }
                break;
            /*case "%":
                display.innerText = percent(num1, num2);
                break;*/
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
    });
});

/*function clearAll() {
    display.innerText = "0";
}*/

/*function equals (a, b) {
    switch (operator) {
        case "+":
            return plus(a, b);
        case "-":
            return minus(a, b);
        case "*":
            return multi(a, b);
        case "/":
            return division(a, b);
        case "%":
            return percent(a, b);
        case "+/-":
            return plusMinus(a, b);
        default:
            return "Error!";
    }
}*/

/*but.forEach((item)=> {
    item.addEventListener("click", function (event) {
        switch (event.target.innerText) {
            case "+":
                display.innerText = plus(display.innerText);
                break;
            case "-":
                display.innerText = minus();
                break;
            case "*":
                display.innerText = multi();
                break;
            case "/":
                display.innerText = division();
                break;
            case "+/-":
                display.innerText = plusMinus(display.innerText);
                break;
            case "%":
                display.innerText = percent();
                break;
            case "AC":
                display.innerText = "0";
                break;
            case "=":
                display.innerText = equals();
                break;
            default:
                if(display.innerText === "0" && event.target.innerText !== ".") {
                    display.innerText = event.target.innerText;
                }
                else {
                    display.innerText += event.target.innerText;
                }
        }
    })
})*/


/*buttons.map((btn) => {
    btn.addEventListener("click", function (event) { //добавляю обработчик событий; (e) елемент на который кликаю
        console.log(event);
        switch (event.target.innerText) {
            case "AC":
                display.innerText = "0";    // сделать не через eval повесить на каждую кнопку клик
                break;
            case "=":
                display.innerText = eval(display.innerText);  //не нравится что использую innerText
                break;
            case "+/-":
                display.innerText = "-"; // поправить минус что бы не менял себя с числа
                break;
            case "%":
                let meaning = display.innerText + "/100";  // поправить процент одно действие
                display.innerText = eval(meaning);
                break;
            case "x":
                display.innerText = display.innerText + "*";
                break;
            default:
                if(display.innerText === "0" && event.target.innerText !== ".") {
                    display.innerText = event.target.innerText;
                }
                else {
                    display.innerText += event.target.innerText;
                }
        }
    });
});*/
