require('express-async-errors');
const express = require('express');
const router = express.Router();
const storeImageUpload = require('../middleware/multer')

const {
    addStore,
    getStore,
    getStores,
    deleteStore,
    updateStore,
    uploadImage,
    removeImage,
    getImage,
    getImages,
} = require('../controllers/store');

router.route('/')
    .get(getStores)
    .post(addStore)

router.route('/:id')
    .get(getStore)
    .delete(deleteStore)
    .patch(updateStore)

router.route('/:id/image')
    .get(getImages)
    .put(storeImageUpload.single('image'), uploadImage)

router.route('/:id/image/:imageid')
    .get(getImage)
    .delete(removeImage)

module.exports = router;
