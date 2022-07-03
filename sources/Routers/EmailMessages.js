


const express = require('express')
const router = express.Router()

const EmailMessages = require('../Controllers/EmailMessages')
const AuthController = require('../Controllers/Auth')

router.post('/createEmailMessage', AuthController.auth, EmailMessages.createEmailMessage)
router.get('/readEmailMessage', AuthController.auth, EmailMessages.readEmailMessage)
router.post('/updateEmailMessage', AuthController.auth, EmailMessages.updateEmailMessage)

module.exports = router

