require('express-async-errors');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')

const {
    getStore,
    getStores,
    addStore,
    uploadStoreHero
} = require('../controllers/store');

router.route('/')
    .get(getStores)
    .post(addStore)

router.route('/:id')
    .get(getStore)

router.route('/:id/hero')
    .put(upload.single('hero'), uploadStoreHero)

module.exports = router;
