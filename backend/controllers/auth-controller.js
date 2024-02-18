const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const generateTokenAndSetCookie = require('../utils/generateToken')



const signUpController = async(req, res) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body

        //checks if the user inputs are matching
        if(password !== confirmPassword){
            res.status(400).json({err: "Passwords does not match!"})
        }

        //checking on the DB if the inputted username exists (must be unique)
        const user = await User.findOne({username})

        if (user){
            res.status(400).json({err: "User exists!"})
        }

        //hashing/encrypting password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        //sets the avatar for male and female users
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`

        //handles new user and generates an avatar based on their gender

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyAvatar : girlAvatar
        })

        if(newUser) {
            //generate jwt token
            await generateTokenAndSetCookie(newUser._id, res)

            //saves the new user
            await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({err: "invalid user data!"})
        }

    }catch(err){
        console.log('Error in signup controller', err.message)
        res.status(500).json({err: "internal server error!"})
    }
}

const loginController = async(req, res) => {
    try{
        const {username, password} = req.body

        const user = await User.findOne({username})
        //compares the plain text password with the stored hashed password
        // uses optional chaining(user?.password) in events where it is null or undefined,
        // it won't short circuit/throw an error
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            res.status(400).json({err: 'Invalid username or password!'})
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic
            })
    }catch(err){
        console.log('Error in login controller', err.message)
        res.status(500).json({err: "internal server error!"})
    }
}

const logoutController = (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({message: "Logout Success!"})
    }catch(err){
        console.log('Error in logout controller', err.message)
        res.status(500).json({err: "internal server error!"})
    }
}

module.exports = { signUpController, loginController, logoutController }