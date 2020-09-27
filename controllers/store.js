require('express-async-errors');
const debug = require('debug')('node-image-upload:server');
const Store = require('../models/Store')
const Image = require('../models/Image')
const { removeFile, removeFiles} = require('../config/s3')

exports.addStore = async (req, res) => {
    const store = await Store.create(req.body)
    res.status(201).json(store)
}

exports.deleteStore = async (req, res) => {

    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    const storeImages = await store.getImages()

    const imageFileNames = storeImages.map(image => image.name)

    await removeFiles(process.env.AWS_S3_IMAGE_BUCKET, imageFileNames)

    await Store.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(204).send()
}

exports.getStore = async (req, res) => {

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

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    res.status(200).json(store)
}

exports.getStores = async (req, res) => {
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

exports.uploadImage = async (req, res) => {
    console.log(req.file)
    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    const image = await store.createImage({
        originalName: req.file.originalname,
        name: req.file.key,
        mimetype: req.file.mimetype,
        size: req.file.size,
        location: req.file.location
    })

    res.status(200).json(image);
}

exports.removeImage = async (req, res) => {

    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    const image = await Image.findByPk(req.params.imageid)

    if (!image) {
        return res.status(404).send(`Image ${req.params.imageid} not found`)
    }

    await removeFile(process.env.AWS_S3_IMAGE_BUCKET, image.name)
    await Image.destroy({ where: { id: req.params.imageid } })

    res.status(204).send()
}

exports.updateStore = async (req, res) => {

    // TODO: Move this to middleware
    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    const updatedStore = await Store.update(req.body, {
        where: {
            id: req.params.id
        },
        validate: true,
        returning: true,
        plain: true
    })

    console.log(updatedStore)

    res.status(200).json(updatedStore[1])
}
