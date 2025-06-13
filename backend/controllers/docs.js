
const Document = require('../models/Document');
const {minioClient, bucketName} = require('../config/minioConfig');
const crypto = require('crypto');
const uploadDocument = async(req, res) => {
    try {
        const {userId,company_name, designation} = req.body;
        const file = req.files.file[0];
        const fileBuffer = file.buffer;
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const uniqueName = `${Date.now()}-${crypto.randomBytes(6).
        toString('hex')}.${extension}`;
        const fileKey = uniqueName;

        await minioClient.putObject(bucketName, fileKey, fileBuffer, {
            'Content-Type':file.mimetype
        })

        const signedUrl = await minioClient.presignedGetObject(bucketName,fileKey, 600);
        const newDoc = await Document.create({
            userId,
            company_name,
            designation,
            originalName,
            fileKey,
            fileUrl:signedUrl
        });

        return res.status(201).json({success:true, msg:"Document uploaded successfully", doc_id:newDoc._id, signedUrl});
    }
    catch(err) {
        console.log(err);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}


module.exports = {uploadDocument};

