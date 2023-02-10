let buttonsUpdate = document.querySelectorAll(".update");
let buttonsOp = document.querySelectorAll(".op");
let mainDisplay = document.querySelector("#main-display")
let topDisplay = document.querySelector("#top-display");


let opSelected = "";
let updaterSelected = "";
let sign = "";


buttonsOp.forEach(e => {
    e.addEventListener('click', e => {
        operateOnDisplay(e.target);
        operatorHighlight(e.target);
    } , false);
})

buttonsUpdate.forEach(e => {
    e.addEventListener('click', e => {
        updateDisplay(e.target);
    } , false);
})


function updateDisplay(button){
        let currentDisplay = mainDisplay.textContent.replace("-","");
        if (mainDisplay.textContent.length > 12) return;
        if ([1,2,3,4,5,6,7,8,9,0].includes(+button.textContent)){
            updaterSelected = button.textContent;
        }
        switch (button.id){
            case "decimal":
                if (currentDisplay.includes(".")) return;
                if (currentDisplay === "") { 
                    currentDisplay = "0."
                } else { 
                    updaterSelected = "."; }
                break;
            case "change-sign":
                sign == "-" ? sign = "" : sign = "-";
                break;
            case "clear":
                currentDisplay = currentDisplay.slice(0,-1);
                if (currentDisplay.length < 1){
                    sign = "";
                }
                break;
            case "all-clear":
                currentDisplay = "";
                topDisplay.textContent = "Calculator"
                operatorHighlight();

        }
        
        mainDisplay.textContent = sign.concat(currentDisplay,updaterSelected);
        updaterSelected = "";
    } 

function operateOnDisplay(op){
    console.log(op.id);
}


function operatorHighlight(button = "clear"){
    if (button == "clear"){
        if (opSelected === "") { return }
        document.getElementById(opSelected).classList.remove("selected");
        return;

    }
    if (opSelected !== ""){
        document.getElementById(opSelected).classList.remove("selected");
    } 
    if (opSelected !== button.id) {
    opSelected = button.id;
    button.classList.add("selected");    
    } else {
    opSelected = "";
    }
    
    
}