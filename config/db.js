const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect to Mongodb ${mongoose.connection.host}`.bgWhite.black)
    }catch (err){
        console.log(`Mongodb Error ${err}`)
    }
}

module.exports = connectDB;