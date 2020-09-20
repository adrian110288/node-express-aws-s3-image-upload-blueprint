const {DataTypes} = require('sequelize');
const sequelize = require('../models/index')
const Image = require('./Image')

const Store = sequelize.define('store', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

Store.hasMany(Image, { onDelete: 'CASCADE', hooks: true })
Image.belongsTo(Store)

module.exports = Store
