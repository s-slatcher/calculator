const buttons = document.querySelectorAll(".btn");
const valDisplay = document.querySelector("#main-display")
const exprDisplay = document.querySelector("#top-display")
const history = document.querySelector("#history")

buttons.forEach(element => {
    element.addEventListener('click', btn => {
        input(btn.target);
    })
});

const input = function(btn){
    let value = valDisplay.textContent;
    let expr = exprDisplay.textContent;

    if (btn.matches(".value")){
        valDisplay.textContent = updateValue(btn.id, value);
    }
    if (btn.matches(".operator")){
        if (expr !== ""){
            valDisplay.textContent = evaluateStr(expr + " " + value)
            value = valDisplay.textContent;
        } 
        exprDisplay.textContent = operatorInput(btn.id, value, expr);
        valDisplay.textContent = "0";
    } 
    if (btn.matches("#equals")){
        valDisplay.textContent = evaluateStr(expr + " " + value);
        exprDisplay.textContent = "";
    }
    if (btn.matches("#all-clear")){
        allClear();
    }
}

function allClear(){
    valDisplay.textContent = "0";
    exprDisplay.textContent = "";
}

function updateValue(btnId, value) {
    if (btnId === "toggle-sign"){
        return toggleNegative(value);
    } else if (btnId === "clear") {
        return clear(value);
    } else if (btnId === ".") {
        return addDecimal(value);
    } else {
        return addNum(value,btnId)
    }
}


function toggleNegative(value){
    return value.charAt(0) === "-" 
        ? value.substring(1)
        : `-${value}`;
}

function addDecimal(value){
    return value.includes(".") 
        ? value
        : `${value}.`
}

function addNum(value, btnId){
    return value === "0" 
        ? btnId
        : `${value}${btnId}`
}

function clear(value){
    cutValue = value.substring(0,value.length-1);
    console.log(cutValue);
    const lastChar = cutValue.charAt(cutValue.length-1);
    console.log(lastChar)
    if (lastChar === "." || lastChar === "-"){
        cutValue = clear(cutValue);
        console.log(". or -")
    }
    if (lastChar === "") {
        console.log("empty reset")
        cutValue = "0";
    }
    return cutValue;
}

function operatorInput(btnId, value, expr){
    let op;
    switch (btnId) {
        case "multiply":
            op = " x"
            break;
        case "divide":
            op = " /";
            break;
        case "plus":
            op = " +";
            break;
        case "minus":
            op = " -";
            break;
        default:
            op = ""
    }
    return `${value}${op}`;
    
}

function evaluateStr(expr){
    let arr = expr.split(" ")
    let answer;
    switch (arr[1]){
        case "x": 
            answer = (+arr[0] * +arr[2]);
            break;
        case "/":
            answer = (+arr[0] / +arr[2]);
            break;
        case "-":
            answer = (+arr[0] - +arr[2]);
            break;
        case "+":
            answer = (+arr[0] + +arr[2]);
            break;
        default:
            answer = +arr[0]
    }
    answer = round(answer).toString();
    addHistory(`${expr} = ${answer}`);
    return answer;
}

function round(num) { 
    return +(Math.round(num + "e+6")  + "e-6");
}

function addHistory(str) {
    const expr = document.createElement("p");
    expr.textContent = str;
    history.appendChild(expr);
    history.scrollTop = history.scrollHeight;
}

