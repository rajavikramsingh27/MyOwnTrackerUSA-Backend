

const express = require('express')
const router = express.Router()

const Company = require('../Controllers/Company')
const AuthController = require('../Controllers/Auth')

router.post('/createCompany', AuthController.auth, Company.createCompany)
router.get('/readCompany', AuthController.auth, Company.readCompany)
router.post('/updateCompany', AuthController.auth, Company.updateCompany)

module.exports = router

