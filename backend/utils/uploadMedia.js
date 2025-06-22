const cloudinary = require('../config/cloudinaryConfig');

const uploadMedia = (file) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new Error('No file or buffer provided'));
        }

        const uploadOptions = {
            folder: 'Emirates-Tax-Platform/media',
            resource_type: 'raw'
        };

        cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
        }).end(file.buffer);
    });
};

module.exports = uploadMedia;