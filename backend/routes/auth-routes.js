const express = require('express')

const router = express.Router()

const { signUpController, loginController, logoutController } = require('../controllers/auth-controller')

router.post('/signup', signUpController)
router.post('/login', loginController)
router.post('/logout', logoutController)

module.exports = router