function makePurchase(event) {
    //event.preventDefault();

    const id = document.querySelector('#drink-choice').value

    console.log('BUTTON CLICKED!')
    console.log(id);
    
    
        fetch(`/api/inventory/${id}`, {
            method: 'put',
            body: JSON.stringify({
                id
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {console.log(response)})  
}

document.querySelector('#submit-drink').addEventListener('click', makePurchase);