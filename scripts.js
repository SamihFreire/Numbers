const form = document.querySelector("form");
const numbers = document.getElementById("numbers");
const fromNumber = document.getElementById("from");
const toNumber = document.getElementById("to");
const checkboxRepeat = document.getElementById("checkbox");


window.addEventListener("input", (event) => {
    if(event.target.name == numbers.name) {
        onlyNumbers(numbers);
    }
    else if (event.target.name == fromNumber.name) 
    {
        onlyNumbers(fromNumber);
    }
    else if (event.target.name == toNumber.name)
    {
        onlyNumbers(toNumber);
    }
    
})

function onlyNumbers(item) {
    item.value = item.value.replace(/\D/g, "");
}

function checkValues(newParameters) {

    if(newParameters.numbers < 1 || newParameters.fromNumber < 1 || newParameters.toNumber < 1){
        alert("Os valoresm devem ser maior que 0!");
        return false;
    }else{
        return true;   
    }
}

form.onsubmit = (event) => {
    event.preventDefault();

    const newParameters = {
        id: new Date().getTime(),
        numbers: numbers.value,
        fromNumber: fromNumber.value,
        toNumber: toNumber.value,
    }

    drawNumbers(newParameters);

}

function drawNumbers(newParameters) {
    try {
        if(checkValues(newParameters)) {
            let luckyNumbers = [];

            for (let i = 0; i < newParameters.numbers; i++) {
                luckyNumbers.push(getRandom(newParameters.fromNumber, newParameters.toNumber));
            }
            
        }
    } catch (error) {
        alert("Não foi possível realizar o sortéio.");
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}