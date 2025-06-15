const mongoose = require('mongoose');


const taxReportSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
    fileUrl: {
        type:String,
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    consultant_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'consultants',
        required:true,
    },

})


module.exports = mongoose.model('taxReports', taxReportSchema);

