


const express = require('express')
const router = express.Router()

const Invoice = require('../Controllers/Invoice')
const AuthController = require('../Controllers/Auth')

router.post('/createInvoice', AuthController.auth, Invoice.createEstimate)
router.get('/readInvoice', AuthController.auth, Invoice.readEstimate)
router.post('/updateInvoice', AuthController.auth, Invoice.updateEstimate)
router.post('/updateInvoiceStates', AuthController.auth, Invoice.updateEstimateStates)
router.post('/updateInvoiceStatesName', AuthController.auth, Invoice.updateEstimateStatesName)
router.post('/deleteInvoice', AuthController.auth, Invoice.deleteEstimate)

module.exports = router

