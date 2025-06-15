const mongoose = require('mongoose');

const consultantsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    assigned_document:[
        {
            type:mongoose.Schema.Types.Mixed,

        }
    ]
})


module.exports = mongoose.model('consultants', consultantsSchema);