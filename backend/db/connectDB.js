const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to MongoDB')
    }catch(err){
        console.log('Error connecting to mongoDB', err.message)
    }
}

module.exports = connectDB