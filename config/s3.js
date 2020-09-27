const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    region: process.env.AWS_S3_REGION,
    apiVersion: '2012-10-17'
});

const removeFile = async function (bucket, fileName) {
    await removeFiles(bucket, [fileName])
}

const removeFiles = async function (bucket, fileNames) {

    const s3Objects = fileNames.map(fileName => (
            {
                "Key": fileName
            }
        )
    )

    const deleteParams = {
        Bucket: bucket,
        Delete: {
            Objects: s3Objects
        }
    };

    await s3.deleteObjects(deleteParams).promise();
}

module.exports = {
    s3,
    removeFile,
    removeFiles
}
