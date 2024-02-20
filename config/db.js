const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("App connected to db");
    }catch(err){
        console.log("error in connecting to db",err);
    }
}
    
module.exports = connectDB;