const buttons = document.querySelectorAll(".btn");

buttons.forEach(element => {
    element.addEventListener('click', btn => {
        input(btn.target.id);
    })
});

const input = function(btn){
    console.log(btn);
}