const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const protectRoute = async(req, res, next) => {
    try{
        //Attempts to extract the JWT token from the request cookies named jwt
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({error: 'Unauthorized: - No Token Provided!'})
        }

        //attempts to verify the extracted token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({err: 'Unauthorized: - Invalid Token!'})
        }

        //extracts the user ID from the decoded token and attempts to find
        //the corresponding user in the db
        //selects all fields except the password field (select('-password')).
        const user = await User.findById(decoded.userID).select('-password')

        if(!user){
            console.log(user)
            return res.status(401).json({err: 'User not found!'})
        }

        // If user is found, it attaches the user object to the req object so that
        //subsequent middleware or route handlers can access authenticated user info
        req.user = user

        //pass control to the next middleware or route handler in the application flow
        next()

    }catch(err){
        console.log('Error in protectRoute middleware', err.message)
        res.status(500).json({err: 'Internal server error'})
    }
}

module.exports = protectRoute