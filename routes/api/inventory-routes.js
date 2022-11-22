const router = require('express').Router();
const Inventory = require('../../models/Inventory');
//const { Drinks } = require('../../models/Inventory');

// PUT


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
router.get('/', (req, res) => {
    Inventory.findOne({
        where: {
            id: req.params.id
        }
    })
})

// POST

// PUT inventory/:id

// DELETE

// PUT

// PUT 
module.exports = router;
