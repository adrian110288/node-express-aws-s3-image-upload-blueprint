const {DataTypes} = require('sequelize');
const sequelize = require('../models/index')
const Store = require('./Store')

const Image = sequelize.define('image', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
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
