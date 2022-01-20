const mongoose=require('mongoose')
require('dotenv').config({path:'./config/.env'})

//function connect to data base

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db not connected") 
    }
}
    module.exports= connectDB