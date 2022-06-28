

const express = require('express')
const router = express.Router()

const Items = require('../Controllers/Items')
const AuthController = require('../Controllers/Auth')

router.post('/createItem', AuthController.auth, Items.createItem)
router.get('/listItem', AuthController.auth, Items.listItem)
router.post('/deleteItem', AuthController.auth, Items.deleteItem)


module.exports = router


// "server": "nodemon sources/index.js",
// "client": "npm start --prefix frontend",
// "dev": "concurrently \"npm run server\" \"npm run client\""