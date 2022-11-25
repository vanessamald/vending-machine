function makePurchase(event) {
    console.log('BUTTON CLICKED!')
   
    const selectElem = document.getElementById('select-drink')
    const displayChoice = document.getElementById('select-label')

    // on change event handler
    selectElem.addEventListener('change', () => {
    const selectedDrink = selectElem.selectedOptions;
    for (let i=0; i < selectedDrink.length; i++) {
    
    // display the user's choice
    displayChoice.innerHTML = selectedDrink[i].label;

    // get the value
    const id = selectedDrink[i].value;
    console.log(selectedDrink[i].value)

    fetch(`/api/inventory/${id}`, {
        method: 'put',
        body: JSON.stringify({
            id
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {console.log(response)})  
    
    return acceptCoins();
    }
})}

function acceptCoins(event) {
    const coins = document.querySelector('#coins').value

    console.log(coins);
}

document.querySelector('#submit-drink').addEventListener('click', makePurchase);
//document.querySelector('#select-drink').addEventListener('change', makePurchase);

//makePurchase();