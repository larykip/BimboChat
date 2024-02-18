 const jwt = require('jsonwebtoken')

 const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '31d'
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //maximum age of a cookie in miliseconds (15 days)
        httpOnly: true, //prevents client-side JS from accessing the cookie
        sameSite: "strict", //prevents browser from sending cookie along with cross-site requests(CSRF protection)
        secure: process.env.NODE_ENV !== 'development'
    })
 }

 module.exports = generateTokenAndSetCookie