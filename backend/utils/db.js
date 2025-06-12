const mongoose = require('mongoose');


const connectToDb = async() => {
    try {   
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connection successfull");
    }
    catch(err) {
        console.log("Some error occured while connecting to db: ",err.message);
        
    }
}

module.exports = connectToDb;