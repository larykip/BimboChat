const express = require('express')
const protectRoute = require('../middleware/protectRoute')
const { sendMessage, getMessage } = require('../controllers/message-controller')

const router = express.Router()

router.post('/send/:id', protectRoute, sendMessage)
router.get('/:id', protectRoute, getMessage)

module.exports = router