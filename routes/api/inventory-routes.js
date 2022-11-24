const router = require('express').Router();
const Inventory = require('../../models/Inventory');
//const { Drinks } = require('../../models/Inventory');

/*
// PUT api/inventory
router.put('/', (req, res) => {

})
*/


// GET api/inventory //THIS ROUTE IS TESTED AND WORKING
// return array of remaining item quantities (an array of integers)
router.get('/', (req, res) => {
    Inventory.findAll()
    .then(dbInventory => res.json(dbInventory))
    .catch(err => {
        console.log(err);
        res.status(500)
    })
});

// GET api/inventory/:id // THIS ROUTE IS TESTED AND WORKING
// return remaining item quantity (an integer)
router.get('/:id', (req, res) => {
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

/*
// PUT inventory/:id
router.put('/:id', (req, res) => {
    Inventory.update(req.body, {
       
        where: {
            id: req.params.id
        }
    })
})
*/

// DELETE
router.delete('/', (req, res) => {
})

/*
// PUT
router.put('/:id', (req, res) => {
})

// PUT 
router.put('/:id')
*/

// buy a drink
// PUT /api/inventory/:id
// return number of items vended
router.put('/:id', (req, res) => {
    
    Inventory.findOne({
        where: {
            id: req.params.id
        }
    }).then((dbInventory) =>{
        console.log(`'Selected ${dbInventory.name} for purchase!'`)
        let vendedItem = 1;
        let number = dbInventory.quantity - vendedItem; 
        
        Inventory.update( 
            { quantity: number },
            {where: { 
                id: req.params.id
            }
        })
        console.log(`'Inventory has been updated to ${dbInventory} successfully'`);

        // send response headers that include X-Inventory-Remaining and X-Coins to be returned
        res.header({
            'Content-Type': 'multipart/form-data',
            'Content-Lenght': '123',
            'X-Inventory-Remaining': `'${number}'`
            //'X-Coins': 
        })  
        // send response body of number of items vended
        res.send({ quantity: `${vendedItem}`});
        })
    })

module.exports = router;
