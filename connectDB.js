const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connect successfully");
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
