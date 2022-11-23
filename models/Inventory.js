const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Inventory model for drinks
class Inventory extends Model {}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING 
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        },
        price: {
            type: DataTypes.DECIMAL,
            defaultValue: 0.50
        }
    },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'inventory'
        } 
);

/*
Inventory.bulkCreate([
    { name: "La Colombe Vanilla Latte" },
    { name: "Topo Chico" },
    { name: "Fiji Water" },

]).then(() => console.log('Drinks have been added!'))
*/
await Inventory.create({
    name: "Topo Chico"
});


module.exports = Inventory;
