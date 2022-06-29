

const express = require('express')
const router = express.Router()

const Client = require('../Controllers/Client')
const AuthController = require('../Controllers/Auth')

router.post('/createClient', AuthController.auth, Client.createClient)
router.get('/readClient', AuthController.auth, Client.readClient)
router.post('/updateClient', AuthController.auth, Client.updateClient)
router.post('/deleteClient', AuthController.auth, Client.deleteClient)
router.get('/deleteAllClient', AuthController.auth, Client.deleteAllClient)

module.exports = router

