let display= document.querySelector(".sum");
/*let buttons = Array.from(document.querySelectorAll(".btn"));*/
let but = document.querySelectorAll(".btn");
let operator

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

function plusMinus(a) {
    return -1 * a;
}

function percent (a, b) {
    return (a * b) / 100;
}

/*function clearAll() {
    display.innerText = "0";
}*/

function equals (a, b) {
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
}

but.forEach((item)=> {
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
})


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
