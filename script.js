let display= document.querySelector(".sum");
let buttons = Array.from(document.querySelectorAll(".btn"));

buttons.map((btn) => {
    btn.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "AC":
                display.innerText = "0";
                break;
            case "=":
                display.innerText = eval(display.innerText);
                break;
            case "+/-":
                display.innerText = "-";
                break;
            case "%":
                let meaning = display.innerText + "/100";
                display.innerText = eval(meaning);
                break;
            default:
                if(display.innerText === "0" && e.target.innerText !== ".") {
                    display.innerText = e.target.innerText;
                }
                else {
                    display.innerText += e.target.innerText;
                }
        }
    });
});
