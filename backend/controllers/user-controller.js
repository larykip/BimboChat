const User = require("../models/user-model")

const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserID = req.user._id

        //find all users whose id is not equal to the id of the logged in user
        //do not display the password field(select())
        const filteredUser = await User.find({_id: { $ne: loggedInUserID }}).select('-password')

        res.status(201).json(filteredUser)

    } catch(err){
        console.log('Error getting users', err.message)
        res.status(500).json({err: 'Internal Server error'})
    }
} 

module.exports = { getUsersForSidebar }