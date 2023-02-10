let buttonsUpdate = document.querySelectorAll(".update");
let buttonsOp = document.querySelectorAll(".op");
let mainDisplay = document.querySelector("#main-display")
let topDisplay = document.querySelector("#top-display");
let equals = document.getElementById("equals");



let opSelected = "";
let updaterSelected = "";
let sign = "";
let currentDisplay = "";
let topDisplayNumber = "";
let expression = "";
let expArr = [];
let answer = 0;
let cleared = true;

equals.addEventListener('click', e => {
    if (mainDisplay.textContent && topDisplay.textContent){
        evaluate(e.target);
    }
})

buttonsOp.forEach(e => {
    e.addEventListener('click', e => {
        opSelected = e.target.id
        operateOnDisplay(e.target);
    } , false);
})

buttonsUpdate.forEach(e => {
    e.addEventListener('click', e => {
        cleared = false;
        if (topDisplay.textContent && (topDisplay.textContent == topDisplayNumber)) allClear();
        updateDisplay(e.target);
    } , false);
})

function allClear(){
    topDisplay.textContent = "";
    mainDisplay.textContent = "";
    sign = "";
    expArr = [];
    cleared = true;
}

function updateDisplay(button){
        let tempDisplay = currentDisplay.replace("-","");
        let isEmpty = !tempDisplay.length;
        if (mainDisplay.textContent.length > 12) return;
        if ([1,2,3,4,5,6,7,8,9,0].includes(+button.textContent)){
            updaterSelected = button.textContent;
        }
        switch (button.id){
            case "decimal":
                if (tempDisplay.includes(".")) return;
                if (isEmpty) { 
                    tempDisplay = "0."
                } else { 
                    updaterSelected = "."; }
                break;
            case "change-sign":
                if (isEmpty) return;
                sign == "-" ? sign = "" : sign = "-";
                break;
            case "clear":
                tempDisplay = tempDisplay.slice(0,-1);
                if (isEmpty) sign = "";
                break;
            case "all-clear":
                tempDisplay = "";
                allClear();
                break;
        }
        mainDisplay.textContent = sign.concat(tempDisplay,updaterSelected);
        currentDisplay = mainDisplay.textContent;
        updaterSelected = "";
        if (!topDisplay.textContent && !mainDisplay.textContent) cleared = true; 
    } 

function operateOnDisplay(op){
    sign = "";
    if (cleared) {
        return;
    }

    if (topDisplay.textContent === "" && mainDisplay.textContent !== ""){
        topDisplayNumber = currentDisplay;
        topDisplay.textContent = `${topDisplayNumber} ${op.textContent}`;     //fill top display then clear out bottom
        currentDisplay = "";
        mainDisplay.textContent = currentDisplay;
        return;
    }
    
    if (currentDisplay == ""){
        topDisplay.textContent = `${topDisplayNumber} ${op.textContent}`
        return;
    }

    evaluate(op);
    
}

function evaluate(op){
    opSelected = "";
    expression = topDisplay.textContent.concat(" ",mainDisplay.textContent)
    expArr = expression.split(" ")
    let num1 = parseFloat(expArr[0]);
    let num2 = parseFloat(expArr[2]);
    switch (expArr[1]){
        case "+": answer = num1 + num2;
            break;
        case "-": answer = num1 - num2;
            break;
        case "/":
            if (expArr[2] == 0){
                alert("Cannot divide by zero.")
                allClear();
                return;
            }
            answer = num1 / num2;
            break;
        case "x": answer = num1 * num2;
            break;
    }
    if (op.textContent == "="){
        topDisplay.textContent = answer.toString();
        console.log(answer);
    } else {
        topDisplay.textContent = `${answer} ${op.textContent}`;
    }
    currentDisplay = "";
    mainDisplay.textContent = currentDisplay;
    topDisplayNumber = answer;
    
}

