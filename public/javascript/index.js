var totalCoins = 0;
var coinButton = document.getElementById('enter-coins');
var displayCoins = document.getElementById('coin-div');
var returnDisplay = document.getElementById('return-display');

// get total of coins from vending machine
coinButton.onclick = function() {
    
    totalCoins++;

    var coinsAdded = totalCoins;
    // convert to dollar amount for user and display total
    let amount = totalCoins /4
    displayCoins.innerHTML = 'Total:' + ' ' + '$' + amount.toFixed(2); 

    // disable Adding Coins button after order submission

    // calculate how many coins need to be returned 
    let coinsReturned = totalCoins -2;

    fetch ('/api/inventory', {
        method: 'PUT',
        body: JSON.stringify ({
            coins: totalCoins
        }),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    /*
    // conditional statement to return coins
    if (totalCoins > 2) {
        fetch(`/api/inventory`, {
            method: 'DELETE',
            params: JSON.stringify ({
                coins: coinsReturned
            }),
            headers: {
                'Content-Type': 'application/json'
              } 
    })
    */
    makePurchase(totalCoins);
  
    //.then(response => response.json())
   
        // calculate return amount 
        let returnAmount = coinsReturned * 0.25
        returnDisplay.innerHTML = 'Return Amount:' + ' ' + '$' + returnAmount.toFixed(2); 
        console.log(`${returnAmount} will be returned`);
    }


function makePurchase(totalCoins) {
    
    const coin = totalCoins;

    console.log('BUTTON CLICKED!')
   
    const selectElem = document.getElementById('select-drink')
    const displayChoice = document.getElementById('select-label')
    
    // on change event handler for drink selection
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
            coin
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
    // reload page
    reloadPage(function () {
        location.reload(true);
    }, 5000);   
}}

function returnCoins() {
    //const coinsReturned = coinsAdded;
    console.log(totalCoins);
    fetch(`/api/inventory`, {
        method: 'DELETE',
        body: JSON.stringify ({
            "coin": totalCoins
        }),
        headers: {
            'Content-Type': 'application/json'
        } 
    })
}

document.querySelector('#inventory').addEventListener('click', getInventory);
document.querySelector('#cancel-order').addEventListener('click', returnCoins);