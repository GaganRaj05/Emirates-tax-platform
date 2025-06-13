const multer = require('multer');

const handleMulterError = (err, req, res, next) => {
    if(err instanceof  multer.MulterError) {
        return res.status(400).json({success:false,msg:err.message});
    }
    else if(err) {
        return res.status(400).json({success:false, msg:err.message});
    }
    next();
}

module.exports = handleMulterError;