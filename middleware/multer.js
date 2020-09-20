const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    region: process.env.AWS_S3_REGION,
    apiVersion: '2012-10-17'
});

const upload = multer({
    storage: multerS3( {
        s3: s3,
        bucket: process.env.AWS_S3_IMAGE_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const filename = `${req.params.id}-${Date.now().toString()}`
            cb(null, filename)
        }
    })
})
module.exports = upload
