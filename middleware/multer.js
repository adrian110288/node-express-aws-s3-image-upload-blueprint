const { s3 } = require('../config/s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

const getStoreImageFilename = (storeId) => {
    return `store-${storeId}-${Date.now().toString()}`
}

const storeImageUpload = multer({
    storage: multerS3( {
        s3: s3,
        bucket: process.env.AWS_S3_IMAGE_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const filename = getStoreImageFilename(req.params.id)
            cb(null, filename)
        }
    })
})
module.exports = storeImageUpload
