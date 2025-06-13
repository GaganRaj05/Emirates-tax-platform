const {minioClient, bucketName} = require('../config/minioConfig');

const initMinio = async() => {
    try {
        const bucketExists = await minioClient.bucketExists(bucketName);
    
        if(!bucketExists) {
            await minioClient.makeBucket(bucketName);
            console.log("New bucket created successfully: ",bucketName);
            return;
        }
        console.log('using existing bucket:',bucketName);
    }
    catch(err) {
        console.log(err.message)
        console.log("An error occured while connecting to minio");
    }
}

module.exports = initMinio;