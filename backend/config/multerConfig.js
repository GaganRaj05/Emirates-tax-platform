const multer = require('multer');
const path = require('path');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb)=> {
const allowedTypes = /pdf|doc|docx|xls|xlsx|csv|txt|rtf|odt|ods|ppt|pptx/;
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
    {name:'file', maxCount:1},
    {name:'tax_report', maxCount:1}
]);

module.exports = upload;