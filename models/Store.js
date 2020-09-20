const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../models/index')
const Image = require('./Image')

const Store = sequelize.define('store', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

Store.hasMany(Image, { onDelete: 'CASCADE', hooks: true })
Image.belongsTo(Store)

module.exports = Store
