const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Inventory model for drinks
class Inventory extends Model {}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
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

module.exports = Inventory;