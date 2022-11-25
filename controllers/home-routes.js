const router = require('express').Router();
const sequelize = require('../config/connection');
const  Inventory  = require('../models/Inventory');

router.get('/', (req, res) => {
    Inventory.findAll({
        attributes: [
            'id',
            'name',
            'price',
            'quantity'
        ]
    }).then(dbInventory => {
        const drink = dbInventory.map(inventory => inventory.get({plain: true}))
        res.render('homepage', { drink });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;