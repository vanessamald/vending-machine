const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Inventory model for drinks
class Inventory extends Model {}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            max: 3
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            max: 5,
            min: 0
        },
        price: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false,
            defaultValue: 0.5
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

Inventory.bulkCreate([
    { name: "La Colombe Vanilla Latte", id: 1 },
    { name: "Topo Chico", id: 2 },
    { name: "Fiji Water", id: 3 },
], {
   ignoreDuplicates: true
}).then(() => console.log('Drinks have been added!'))

module.exports = Inventory;