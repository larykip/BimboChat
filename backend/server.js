//importing express
const express = require('express')
const cookieParser = require('cookie-parser')

//initializing express
const app = express()

//importing .env
const dotenv = require('dotenv')

//importing MongoDB connection
const connectDB = require('./db/connectDB')

//parse incoming requests to JSON payloads (from req.body)
app.use(express.json())
app.use(cookieParser())

//importing auth router
const authRoutes = require('./routes/auth-routes')
const messageRoutes = require('./routes/message-routes')
const usersRoutes = require('./routes/user-routes')

//configuring .env so as to be accessed in this file
dotenv.config()

//assigns port value from the .env or defaults to 5000 if none found
const PORT = process.env.PORT || 5000

//middleware for accessing routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', usersRoutes)


//listening to the server
app.listen(PORT, () => {
    connectDB()
    console.log(`listening to port ${PORT}`)
})

app.get('/test', (req, res) => {
    res.send('Hey Kingfish')
})