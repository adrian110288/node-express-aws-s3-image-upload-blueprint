const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
    secretAccessKey: '', // FILL IT
    accessKeyId: '', // FILL IT
    region: 'eu-west-2',
    apiVersion: '2012-10-17'
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'test-express-image-upload',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const filename = `hero-${req.params.id}-${Date.now().toString()}`
            cb(null, filename)
        }
    })
})
module.exports = upload
