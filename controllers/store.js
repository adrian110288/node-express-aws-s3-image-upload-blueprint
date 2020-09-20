require('express-async-errors');
const debug = require('debug')('node-image-upload:server');
const Store = require('../models/Store')
const Image = require('../models/Image')

exports.addStore = async (req, res, next) => {
    const store = await Store.create(req.body)
    res.status(201).json(store)
}

exports.deleteStore = async (req, res, next) => {
    await Store.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(204).send()
}

exports.getStore = async (req, res, next) => {

    const store = await Store.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Image,
            attributes: [
                'id', 'location'
            ]
        }]
    });

    if (store) {
        return res.status(200).json(store)
    }

    res.status(404).send()
}

exports.getStores = async (req, res, next) => {
    const users = await Store.findAll({
        include: [{
            model: Image,
            attributes: [
                'id', 'location'
            ]
        }]
    });
    res.send(users);
}

exports.uploadImage = async (req, res, next) => {
    console.log(req.file)
    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(400).send(`Store ${req.params.id} not found`)
    }

    const image = await store.createImage({
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        location: req.file.location
    })

    res.status(200).json(image);
}
