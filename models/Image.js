const {DataTypes} = require('sequelize');
const sequelize = require('../models/index')
const Store = require('./Store')

const Image = sequelize.define('image', {
    name: {
        type: DataTypes.STRING
    },
    mimetype: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.STRING
    }
}, {});

module.exports = Image
