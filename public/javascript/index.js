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
    makePurchase(totalCoins);
  
    //.then(response => response.json())
   
        // calculate return amount 
        let returnAmount = coinsReturned * 0.25
        returnDisplay.innerHTML = 'Return Amount:' + ' ' + '$' + returnAmount.toFixed(2); 
        console.log(`${returnAmount} will be returned`);
    }

function makePurchase(totalCoins) {
    // get coins entered 
    const coin = totalCoins;
    console.log('BUTTON CLICKED!')
   
    // add event listener for drink button
    const selectElem = document.querySelectorAll('.select-drink')
    selectElem.forEach(function(drinkBtn) {
        drinkBtn.addEventListener('click', () => {

        // get the drink selection
        console.log(drinkBtn.getAttribute('data'));
        const selectedDrink = drinkBtn.getAttribute('data');
        console.log(selectedDrink);

        // get the value
        const id = selectedDrink;
        // display the user's choice
        const displayChoice = document.getElementById('select-label');
        let text = drinkBtn.textContent;
        displayChoice.innerHTML = 'Your selection:' + ' ' + text;
        
        // event listener for submit button
        const submitDrink = document.getElementById('submit-drink');
        submitDrink.addEventListener('click', () => {

            fetch(`/api/inventory/${id}`, {
                method: 'put',
                body: JSON.stringify({
                    coin
                }),
                headers: { 'Content-Type': 'application/json' }
                }).then((response) => {console.log(response)
                
                    // if drink oos display error and send user to get returned coins 
                    if (response.status === 404) {
                        displayChoice.innerHTML = `Sorry the selected item is out of stock!`
                        returnCoins();
                    } 
                })   
            })
        })
    })
};

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
        //modal.innerHTML = 'Stock Quantity:' + drinks.quantity;
        drinkQuantity.innerHTML = 'Stock Quantity:' + drinks.quantity;

        inventoryDiv.appendChild(inventoryList);
        inventoryList.appendChild(drinkQuantity);
    }  
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
    // take total coins entered and calculate how much money user gets back
    const returnAmount = totalCoins * 0.25;
    returnDisplay.innerHTML = 'Return Amount:' + '$' + returnAmount.toFixed(2);
    displayCoins.innerHTML = 'Total: $0.00';
}

// open/close Inventory modal from W3Schools
var modal = document.getElementById("myModal");
var inventoryModal = document.getElementById("inventory");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
inventoryModal.onclick = function() {
  modal.style.display = "block";
  getInventory();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none"; 
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//document.querySelector('#inventory').addEventListener('click', getInventory);
document.querySelector('#cancel-order').addEventListener('click', returnCoins);