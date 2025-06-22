const mongoose = require('mongoose');



const questionAnswerSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    answer: {
        type:mongoose.Schema.Types.Mixed,
        required:true,
    }
}, {_id:false});

const documentsSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    questions: [questionAnswerSchema],
    originalName:{
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