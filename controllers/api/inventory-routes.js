const router = require('express').Router();
const Inventory = require('../../models/Inventory');

// PUT api/inventory
router.put('/', (req, res) => {
    res.status(204);
    //console.log(req.body)
    // deconstruct req.body
    const { coins } = req.body;
    console.log(coins);
 
    if (coins <= 2) {
        res.header({
            'Content-Type': 'multipart/form-data',
            'X-Coins': `'${coins}'`
        }) 
        res.send();
    }
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
    let { coins } = req.body;
    if (coins < 2) {
        res.header({
            'Content-Type': 'multipart/form-data',
            'X-Coins': `'${coins}'`
        })  
        console.log(`'${coins} quarter(s) will be returned'`)
    }
})

// PUT /api/inventory/:id
// return number of items vended
router.put('/:id', (req, res) => {
    //res.status(200);
    Inventory.findOne({
        where: {
            id: req.params.id
        }
    }).then((dbInventory) =>{
        console.log(`'Selected ${dbInventory.name} for purchase!'`)
        let vendedItem = 1;
        var number = dbInventory.quantity - vendedItem; 
        
        if ( number <= 0 ) {
            var number = 0;
        }
        Inventory.update( 
            { quantity: number },
            {where: { 
                id: req.params.id
            }
        })
        console.log(`'Inventory has been updated to ${number} successfully'`);
        
        // if item is out of stock set Response Code to 404 (Not Found)
        if (dbInventory.quantity <= 0) {
            //res.status(404)
            console.log('Sorry the selected item is out of stock')
            res.header({
                'Content-Type': 'multipart/form-data',
                'Content-Lenght': '123',
                //'X-Coins': 
            })
        } 
        if (dbInventory.quantity >= 1)  {
        // send response headers that include X-Inventory-Remaining and X-Coins to be returned
        res.header({
            'Content-Type': 'multipart/form-data',
            'Content-Lenght': '123',
            'X-Inventory-Remaining': `'${number}'`
            //'X-Coins': 
        })  
        // send response body of number of items vended
        res.send({ quantity: `${vendedItem}`});       
        }

        // PUT insufficient amount entered
        // status 403 Not Authorized
        let { coins } = req.body;
        if (coins < 2 ) {
            res.status(403).send('Insufficient amount entered')
            res.header({
                'Content-Type': 'multipart/form-data',
                'X-Coins': `'${coins}'`
            })
        }
    })
})

module.exports = router;
