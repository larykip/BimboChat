const mongoose = require('mongoose')

conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        } 
    ], //field is an array
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
}, {timestamps: true})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation