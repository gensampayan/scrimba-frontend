/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const inputEl = document.getElementById("num-input-field")
const convertBtn = document.querySelector(".convert-btn")
const resultEl = document.querySelector(".result")
const resultCards = JSON.parse(localStorage.getItem("myCards"))
// Need help in this part about persisting the data again in the view

let conversions = [
    {
        measurement: "Length (Meter/Feet)",
        category: "length",
        base: 3.281,
        unit1: "meter",
        unit2: "feet"
    },
    {
        measurement: "Volume (Liters/Gallons)",
        category: "volume",
        base: 0.264,
        unit1: "liters",
        unit2: "gallons"
    },
    {
        measurement: "Mass (Kilograms/Pounds)",
        category: "mass",
        base: 2.204,
        unit1: "kilograms",
        unit2: "pounds"
    }
]

convertBtn.addEventListener("click", function() {
    renderConversion();
})

function renderConversion() {
    let input = inputEl.value;
    let card = "";

    for(let cardIndex = 0; cardIndex < conversions.length; cardIndex++) {
        if(input === '') {
            alert("Input is empty")
        } else if(isNaN(input)) {
            alert("Input is not a number")
        } else {
            card += `
            <div class="divider">
            <h3>${conversions[cardIndex].measurement}</h3>
            ${input} ${conversions[cardIndex].unit1} = ${(input * conversions[cardIndex].base).toFixed(3)} ${conversions[cardIndex].unit2}
            | ${input} ${conversions[cardIndex].unit2} = ${(conversions[cardIndex].base / input).toFixed(3)} ${conversions[cardIndex].unit1}
            </div>
        `
        }
    }
    resultEl.innerHTML = card;
    localStorage.setItem("myCards", JSON.stringify(card));
}

