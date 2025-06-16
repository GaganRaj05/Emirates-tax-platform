const multer = require('multer');
const path = require('path');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb)=> {
    const allowedTypes =  /pdf|docs|csv|txt|xlsx|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype ){
        return cb(null, true);
    }
    else {
        return cb(new Error('Only documents are allowed'), false);
    }
}


const upload = multer({
    storage:storage,
    limits: {fileSize:100 * 1024 * 1024},
    fileFilter:fileFilter,
}).fields([
    {name:'file', maxCount:1}
]);

module.exports = upload;