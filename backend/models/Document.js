const mongoose = require('mongoose');


const documentsSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    company_name: {
        type:String,
        required:true,
    },
    designation: {
        type:String,
        required:true
    },

    originalName:{
        type:String,
        required:true,
    },
    fileKey: {
        type:String,
        required:true,
    },
    fileUrl: {
        type:String,
        required:true,
    },
    uploadedDate: {
        type:Date,
        default:Date.now,
    },
    reviewed: {
        type:Boolean,
        default:false,
    },
    assigned:
    {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('documents', documentsSchema);