var total = 0;
var button = document.getElementById('enter-coins');
var displayCoins = document.getElementById('coin-div');

// get total of coins from vending machine
button.onclick = function() {
    total++;
    // convert to dollar amount for user and display total
    let coins = total /4
    displayCoins.innerHTML = coins;
    
}
// take user to make purchase
// return makePurchase();

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
    }
})}

function getInventory () {
   fetch('/api/inventory', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      displayInventory(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));
   
function displayInventory(data) {
    for (let i =0; i < data.length; i ++) {
        const  drinks  = data[i];
        console.log(drinks);

        const inventoryDiv = document.getElementById('inventory-div');

        const inventoryList = document.createElement("p");
        inventoryList.innerHTML = drinks.name;
        
        const drinkQuantity = document.createElement("p");
        drinkQuantity.innerHTML = 'Stock Quantity:' + drinks.quantity;

        inventoryDiv.appendChild(inventoryList);
        inventoryList.appendChild(drinkQuantity);
    }
}}

document.querySelector('#inventory').addEventListener('click', getInventory);