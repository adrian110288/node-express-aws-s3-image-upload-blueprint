const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/index')

const Store = sequelize.define('Store', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    heroUrl: {
        type: DataTypes.STRING
    }
}, {
});

module.exports = Store
