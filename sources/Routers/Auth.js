

const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth')

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/readProfile', AuthController.auth, AuthController.readProfile)
router.post('/updateProfile', AuthController.auth, AuthController.updateProfile)
router.post('/changePassword', AuthController.auth, AuthController.changePassword)
router.post('/resetPassword', AuthController.resetPassword)
router.post('/setPasswordFromSentLinkOnMail', AuthController.setPasswordFromSentLinkOnMail)

module.exports = router
