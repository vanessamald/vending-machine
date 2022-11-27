const router = require('express').Router();
const Inventory = require('../../models/Inventory');

// PUT api/inventory
router.put('/', (req, res) => {
    res.status(204);
    //console.log(req.body)
    // deconstruct req.body
    let { coins } = req.body;
    console.log(coins);
 
        // send response of coins accepted
        res.header({
            'Content-Type': 'multipart/form-data',
            'X-Coins': `'${coins}'`
        }) 
        res.send();
    })

// GET api/inventory 
// return array of remaining item quantities (an array of integers)
router.get('/', (req, res) => {
    Inventory.findAll()
    .then(dbInventory => res.json(dbInventory))
    .catch(err => {
        console.log(err);
        res.status(500)
    })
});

// GET api/inventory/:id 
// return remaining item quantity (an integer)
router.get('/:id', (req, res) => {
    res.status(200);
    Inventory.findOne({
        attributes: { exclude: ['id', 'price']},
        where: {
            id: req.params.id
        }
        })
        .then(dbInventory => res.json(dbInventory))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    })

// DELETE 
// set response headers to X-Coins: # of coins to be returned
router.delete('/', (req, res) => {
    let { coin } = req.body;
    console.log(coin);
        // send response headers
        res.header({
            'Content-Type': 'multipart/form-data',
            'X-Coins': `'${coin}'`
        })  
        console.log(`'${coin} quarter(s) will be returned'`)
    // send response code of 204
    res.set(204).send();   
})

// PUT /api/inventory/:id
router.put('/:id', (req, res) => {
    Inventory.findOne({
        where: {
            id: req.params.id
        }
    }).then((dbInventory) =>{
        console.log(`'Selected ${dbInventory.name} for purchase!'`)
        let vendedItem = 1;
        let updatedQuantity = dbInventory.quantity - vendedItem; 
        let { coin } = req.body;
        console.log(coin);

        // if item is out of stock set Response Code to 404 (Not Found)
        if (dbInventory.quantity <= 0) {
            
            // set inventory to 0 
            const updatedQuantity = 0;
            console.log(updatedQuantity);
            
            Inventory.update( 
                { quantity: updatedQuantity },
                {where: { 
                    id: req.params.id
                } 
            })
            res.header({
                'Content-Type': 'multipart/form-data',
                'X-Coins': `'${coin}'` 
            })
            // set response code 
            res.statusMessage = 'Sorry the selected item is out of stock!';
            res.status(404).end();
        } 
        // make purchase if drink is in stock and sufficient coins entered
        if (dbInventory.quantity >= 1 && coin >= 2)  {
        
        // update db after purchase is made 
        Inventory.update( 
            { quantity: updatedQuantity },
            {where: { 
                id: req.params.id
            } 
        })
        console.log(`'Inventory has been updated to ${updatedQuantity} successfully'`);
        // send response headers that include X-Inventory-Remaining and X-Coins to be returned
        res.header({
            'Content-Type': 'multipart/form-data',
            'Content-Lenght': '123',
            'X-Inventory-Remaining': `'${updatedQuantity}'`,
            'X-Coins': `'${coin}'`
        })  
        // send response body of number of items vended and response code 200
        res.status(200);
        // return number of items vended
        res.send({ quantity: `${vendedItem}`});       
        }
        // if insufficient amount entered 
        if (dbInventory.quantity >= 1 && coin === 1 ) {
            const coinsNeeded = coin + ' ' + '/ 2';
            res.header({
                'Content-Type': 'multipart/form-data',
                'X-Coins': `'${coinsNeeded}'`
            })
            // send response code 403 
            res.statusMessage = 'Insufficient amount entered!';
            res.status(403).end();
        }      
    })  
})

module.exports = router;
