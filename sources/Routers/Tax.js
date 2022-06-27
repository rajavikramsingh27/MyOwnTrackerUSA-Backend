

const express = require('express')
const router = express.Router()

const Tax = require('../Controllers/Tax')
const AuthController = require('../Controllers/Auth')

router.post('/createTax', AuthController.auth, Tax.createTax)
router.get('/listTax', AuthController.auth, Tax.listTax)
router.post('/deleteTax', AuthController.auth, Tax.deleteTax)


module.exports = router


// "server": "nodemon sources/index.js",
// "client": "npm start --prefix frontend",
// "dev": "concurrently \"npm run server\" \"npm run client\""