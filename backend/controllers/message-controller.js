const Conversation = require("../models/conversation-model")
const Message = require("../models/message-model")

const sendMessage = async(req, res) => {
    try{
        const {message} = req.body
        const {id: receiverId} = req.params  //same as id = req.params.id
        const senderId = req.user._id //req.user from the protectRoute

        //checks if there is a conversation where both sender & receiver were paricipants
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        //if none found, it creates a new conversation with both the sender & receiver
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        //creates a new Message object specifing the sender, receiver & the message sent
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        //if the message objects is created successfully, it adds the ID of the message
        //to the messages array of the conversation
        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //alternative 1
        // await conversation.save()
        // await newMessage.save()

        //alternative 2 of above which is slower compared to this
        //saves concurrently as compared to above which waits for the first one to finish
        await Promise.all(conversation.save(), newMessage.save())

        res.status(201).json({newMessage})

    }catch(err){
        console.log('Error in send message controller', err.message)
        res.status(500).json({err: 'internal server error'})
    }
}

const getMessage = async(req, res) => {
    try{
        const {id: userToChat} = req.params
        const senderId = req.user._id

        //populate('messages') method is used to populate the messages field in 
        //the returned conversation object with the actual message documents
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] }
        }).populate('messages')

        if (!conversation) return res.status(200).json([])

        messages = conversation.messages

    res.status(200).json(messages)
    }catch(err){
        console.log('error in getting messages')
        res.status(500).json({err: 'internal server error'})
    }
}

module.exports = { sendMessage, getMessage }