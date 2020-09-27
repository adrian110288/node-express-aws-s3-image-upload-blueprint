require('express-async-errors');
const express = require('express');
const router = express.Router();
const storeImageUpload = require('../middleware/multer')

const {
    getStore,
    getStores,
    addStore,
    deleteStore,
    uploadImage,
    removeImage,
    updateStore
} = require('../controllers/store');

router.route('/')
    .get(getStores)
    .post(addStore)

router.route('/:id')
    .get(getStore)
    .delete(deleteStore)
    .patch(updateStore)

router.route('/:id/image')
    .put(storeImageUpload.single('image'), uploadImage)

router.route('/:id/image/:imageid')
    .delete(removeImage)

module.exports = router;
