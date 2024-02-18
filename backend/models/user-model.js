const mongoose = require('mongoose')

//creates a user schema with the following fields
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        minlength: 6
    },
    gender:  {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    profilePic:  {
        type: String,
        default: ''
    },
})

const User = mongoose.model("User", userSchema)

module.exports = User