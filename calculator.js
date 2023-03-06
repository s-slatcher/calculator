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
        valueInput(btn.id, value);
    } else if (btn.matches(".operator")){
        operatorInput(btn.id, value, expr);
    } 
    
}

function valueInput(btnId, value) {
    let updateValue = new UpdateValue(value);

    if (btnId === "decimal"){
        valDisplay.textContent = updateValue.insertDecimal();
    } else if (btnId === "toggle-sign"){
        valDisplay.textContent = updateValue.toggleNegative();
    } else {
        valDisplay.textContent = updateValue.insertNumber(btnId);
    }
}

function operatorInput(btnId, value, expr){
    if (expr !== "") {
        let exprStr = expr+" "+value
        valDisplay.textContent = evaluateStr(exprStr);
        value = valDisplay.textContent;
    }

    let op;
    switch (btnId) {
        case "multiply":
            op = "x"
            break;
        case "divide":
            op = "/";
            break;
        case "plus":
            op = "+";
            break;
        case "minus":
            op = "-";
            break;
    }
    
    exprDisplay.textContent = value + " " + op;
    valDisplay.textContent = "0"
   
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
    }
    answer = round(answer).toString();
    addHistory(`${expr} = ${answer}`);
    return answer;
}


class UpdateValue {
    constructor(value){
        this.value = value;
        this.isZero = this.value === "0";
        this.isNegative = this.value.charAt(0) === "-";
        this.isFractional = this.value.includes(".");
    }
    insertNumber(num) {
        return this.isZero ?
            num : this.value + num;
    }
    toggleNegative(){
        return this.isNegative ? 
            this.value.substring(1) : `-${this.value}`;
    }
    insertDecimal(){
        return this.isFractional ?
            this.value : `${this.value}.`;
    }
}


/// small secondary functions

function round(num) { 
    return +(Math.round(num + "e+8")  + "e-8");
}

function addHistory(str) {
    const expr = document.createElement("p");
    expr.textContent = str;
    history.appendChild(expr);
}

