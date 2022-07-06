


const express = require('express')
const router = express.Router()

const Invoice = require('../Controllers/Invoice')
const AuthController = require('../Controllers/Auth')

router.post('/createInvoice', AuthController.auth, Invoice.createInvoice)
router.get('/readInvoice', AuthController.auth, Invoice.readInvoice)
router.post('/updateInvoice', AuthController.auth, Invoice.updateInvoice)
router.post('/updateStates', AuthController.auth, Invoice.updateInvoiceStates)
router.post('/updateInvoiceStatesName', AuthController.auth, Invoice.updateInvoiceStatesName)
router.post('/deleteInvoice', AuthController.auth, Invoice.deleteInvoice)

module.exports = router

