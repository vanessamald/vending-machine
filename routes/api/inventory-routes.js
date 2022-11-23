const router = require('express').Router();
const Inventory = require('../../models/Inventory');
//const { Drinks } = require('../../models/Inventory');

// PUT api/inventory
router.put('/', (req, res) => {

})


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

// PUT inventory/:id
router.put('/:id', (req, res) => {
    Inventory.update(req.body, {
       
        where: {
            id: req.params.id
        }
    })
})

// DELETE
router.delete('/', (req, res) => {
})

// PUT
router.put('/:id', (req, res) => {
})

// PUT 
router.put('/:id')

// buy a drink
// POST /api/inventory/buy/:id
router.post('/:id', (req, res) => {
    Inventory.findOne({
        where: {
            id: req.params.id
        }
    }).then((dbInventory) =>{
        console.log(`'Selected ${dbInventory.name} for purchase!'`)

        let number = dbInventory.quantity - 1; 
        
        Inventory.update( 
            { quantity: number},
            {where: { 
                id: req.params.id
            }
        }).then((dbInventory) => {
            console.log(`'Inventory has been update to ${dbInventory} successfully'`);
        })   
    })
})

module.exports = router;
