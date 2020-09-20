require('express-async-errors');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')

const {
    getStore,
    getStores,
    addStore,
    deleteStore,
    uploadImage
} = require('../controllers/store');

router.route('/')
    .get(getStores)
    .post(addStore)

router.route('/:id')
    .get(getStore)
    .delete(deleteStore)

router.route('/:id/image')
    .put(upload.single('image'), uploadImage)

module.exports = router;
