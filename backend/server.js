//importing express
const express = require('express')

//initializing express
const app = express()

//importing .env
const dotenv = require('dotenv')

//configuring .env so as to be accessed in this file
dotenv.config()

//assigns port value from the .env or defaults to 5000 if none found
const PORT = process.env.PORT || 5000

//listening to the server
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

app.get('/test', (req, res) => {
    res.send('Hey Kingfish')
})