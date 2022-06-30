

const express = require('express')
const router = express.Router()

const GenricContract = require('../Controllers/GenricContract')
const AuthController = require('../Controllers/Auth')

router.post('/createGenericContract', AuthController.auth, GenricContract.createGenericContract)
router.get('/readGenericContract', AuthController.auth, GenricContract.readGenericContract)
router.post('/updateGenericContract', AuthController.auth, GenricContract.updateGenericContract)

module.exports = router

