const router = require('express').Router();
const Inventory = require('../../models/Inventory');
//const { Drinks } = require('../../models/Inventory');

// PUT api/inventory
router.put('/', (req, res) => {

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
module.exports = router;
