require('express-async-errors');
const debug = require('debug')('node-image-upload:server');
const Store = require('../models/Store')
const upload = require('../middleware/multer')

exports.addStore = async (req, res, next) => {
    const store = await Store.create(req.body)
    res.status(201).json(store)
}

exports.getStore = async (req, res, next) => {

    const store = await Store.findOne({where: {id: req.params.id}});

    if (store) {
        return res.status(200).json(store)
    }

    res.status(404).send()
}

exports.getStores = async (req, res, next) => {
    const users = await Store.findAll();
    res.send(users);
}

exports.uploadStoreHero = async (req, res, next) => {
    const store = await Store.findByPk(req.params.id)
    store.heroUrl = req.file.location
    await store.save()
    res.status(200).json(store);
}
