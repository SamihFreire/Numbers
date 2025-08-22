let numero_sorteio = 0;

const form = document.querySelector("form");
const numbers = document.getElementById("numbers");
const fromNumber = document.getElementById("from");
const toNumber = document.getElementById("to");
const checkboxRepeat = document.getElementById("checkbox");

const orientation_class = document.querySelector(".orientation");
const parameters = document.querySelector(".parameters");
const toggle_wrapper = document.querySelector(".toggle-wrapper");
const input_checkbox = document.querySelector("#checkbox");
const button = document.querySelector(".card");

// Elementos cridos após o sorteio
let buttonCreated;
let drawnNumbersCreated;
let labelResultCreated;

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
    try{
        event.preventDefault();

        const newParameters = {
            id: new Date().getTime(),
            numbers: numbers.value,
            fromNumber: fromNumber.value,
            toNumber: toNumber.value,
        }

        if(parseInt(fromNumber.value) > parseInt(toNumber.value)) {
            alert("O primeiro número do sorteio não pode ser maior que o ultimo!")
            return;
        }

        if(input_checkbox.checked && parseInt(numbers.value) > parseInt(toNumber.value)) {
            alert("A quantidades de números sorteada não pode ser maior que o valor maximo do número de sorteio!")
            return;
        }

        let luckyNumbers = drawNumbers(newParameters);
        
        showResult(luckyNumbers);

    } catch (error) {
        alert("Não foi possível realizar o sortéio.");
    }
}

function drawNumbers(newParameters) {

    if(checkValues(newParameters)) {
        let luckyNumbers = [];

        for (let i = 0; i < newParameters.numbers; i++) {
            let luckyValue = getRandom(newParameters.fromNumber, newParameters.toNumber);

            if((input_checkbox.checked && !luckyNumbers.includes(luckyValue)) || !input_checkbox.checked){
                luckyNumbers.push(luckyValue);
            }else {
                i--;
            }
        }
        return luckyNumbers;
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showResult(luckyNumbers) {
    numero_sorteio += 1;
    let timeEndlucky = 0;

    if(numero_sorteio > 1 && buttonCreated != null) {
        clearFields(buttonCreated, drawnNumbersCreated, labelResultCreated);
    }
    else
    {
        // orientation_class.remove();
        // parameters.remove();
        // toggle_wrapper.remove();
        // button.remove();

        orientation_class.classList.add("occult");
        parameters.classList.add("occult");
        toggle_wrapper.classList.add("occult");
        button.classList.add("occult");
    }

    const label_result = document.createElement("div");
    label_result.classList.add("label-result");
    form.append(label_result);

    const h2_result = document.createElement("h2");
    h2_result.textContent = "Resultado do sorteio";

    const p_result = document.createElement("p");
    p_result.textContent = `${numero_sorteio}º resultado`;
    
    label_result.append(h2_result, p_result);
    
    const drawn_numbers = document.createElement("div");
    drawn_numbers.classList.add("drawn-numbers");
    form.append(drawn_numbers);

    for (let i = 0; i < luckyNumbers.length; i++) {
        setTimeout(function () { 
            let drawn_item = document.createElement("div");
            drawn_item.classList.add("drawn-item");
            
            let internal_div = document.createElement("div");
            internal_div.classList.add("drawn-item");
            internal_div.textContent = luckyNumbers[i];

            drawn_numbers.append(drawn_item);
            drawn_item.append(internal_div);
        }, i * 4000);

        timeEndlucky = (i + 0.8) * 4000;
    }
    drawnNumbersCreated = drawn_numbers;
    labelResultCreated = label_result;
    setTimeout(() => {
        buttonCreated = createElementButton();
    }, timeEndlucky);
}

function createElementButton() {
    let card = document.createElement("div");
    card.classList.add("card");
    form.append(card);
    
    let border = document.createElement("div");
    border.classList.add("border");
    card.append(border);
    
    let content = document.createElement("div");
    content.classList.add("content");
    card.append(content);

    let generate_button = document.createElement("button");
    generate_button.classList.add("generate-button")
    generate_button.textContent = "SORTEAR NOVAMENTE";
    generate_button.setAttribute("type", "submit")
    content.append(generate_button);

    let icons_button = document.createElement("div");
    icons_button.classList.add("icons-button");
    generate_button.append(icons_button);

    let play_icon = document.createElement("img");
    play_icon.setAttribute("src", "./assets/icons/play-icon.svg");
    icons_button.append(play_icon);

    let circle_icon = document.createElement("img");
    circle_icon.setAttribute("src", "./assets/icons/circle-arrow.svg");
    icons_button.append(circle_icon);

    let buttonCreated =  card;
    return buttonCreated;
}

function clearFields(buttonCreated, drawnNumbersCreated, labelResultCreated) {
    buttonCreated.remove();
    drawnNumbersCreated.remove();
    labelResultCreated.remove();
}