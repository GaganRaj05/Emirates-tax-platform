const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint:process.env.MINIO_ENDPOINT,
    port:process.env.MINIO_PORT,
    useSSL:false,
    accessKey:process.env.MINIO_ACCESS_KEY,
    secretKey:process.env.MINIO_SECRET_KEY
})

module.exports = {
    minioClient,
    bucketName:'tax-docs'
}