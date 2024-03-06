const Base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
let fromCurrency = document.querySelector(".from select");
let toCurreny = document.querySelector(".to select");

for(let select of dropdowns) {
    for(let currencyName in countryList){
        let newOption = document.createElement("option");
        newOption.innerHTML = currencyName;
        newOption.value = currencyName;

        if(select.name === "from" && currencyName === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currencyName === "BDT") {
            newOption.selected = "selected";
        }

        select.append(newOption);

        select.addEventListener("change", (evt)=>{
            changeFlag(evt.target);
        });

        const changeFlag = (option) =>{
            let currencyName = option.value;
            let countryName = countryList[currencyName];
           
            let imgSrc = `https://flagsapi.com/${countryName}/flat/64.png`;
            let img = option.parentElement.querySelector("img");
            img.src = imgSrc;
        }
    };
};
 

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    if(amountValue === "" || amountValue<1){
        amountValue = "1";
        amount.value = 1;
    }

    let url = `${Base_url}/${fromCurrency.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurreny.value.toLowerCase()];
    
    let finalAmount = amountValue * rate;
    msg.innerHTML = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurreny.value}`;
})





    




