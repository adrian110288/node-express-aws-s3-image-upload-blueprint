require('express-async-errors');
const Store = require('../models/Store')
const Image = require('../models/Image')
const { removeFile, removeFiles} = require('../config/s3')

// @desc      Create store
// @route     POST /store
// @access    Public
exports.addStore = async (req, res) => {
    const store = await Store.create(req.body)
    res.status(201).json(store)
}

// @desc      Remove store
// @route     DELETE /store
// @access    Public
exports.removeStore = async (req, res) => {

    // TODO: Move this to middleware
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

// @desc      Get store by id
// @route     GET /store/:id
// @access    Public
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

// @desc      Get all stores
// @route     GET /store
// @access    Public
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

// @desc      Upload store image
// @route     PUT /store/:id/image
// @access    Public
exports.uploadImage = async (req, res) => {

    // TODO: Move this to middleware
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

// @desc      Remove store image
// @route     DELETE /store/:id/image/:imageid
// @access    Public
exports.removeImage = async (req, res) => {

    // TODO: Move this to middleware
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

// @desc      Update store
// @route     PATCH /store/:id
// @access    Public
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

// @desc      Get single store image
// @route     GET /store/:id/image/:imageid
// @access    Public
exports.getImage = async (req, res) => {

    // TODO: Move this to middleware
    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    const image = await Image.findByPk(req.params.imageid)

    if (!image) {
        return res.status(404).send(`Image ${req.params.imageid} not found`)
    }

    res.status(200).json(image)
}

// @desc      Get all store images
// @route     GET /store/:id/image
// @access    Public
exports.getImages = async (req, res) => {

    // TODO: Move this to middleware
    const store = await Store.findByPk(req.params.id)

    if (!store) {
        return res.status(404).send(`Store ${req.params.id} not found`)
    }

    const images = await store.getImages()

    res.status(200).json(images)
}
