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

function checkValue(value) {

    if(value < 1){
        alert("Quantidade de números deve ser maior que 0!");
        return 1;
    }else{
        return value;   
    }
}