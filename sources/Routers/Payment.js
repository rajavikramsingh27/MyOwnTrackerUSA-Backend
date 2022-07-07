


const express = require('express')
const router = express.Router()

const Payment = require('../Controllers/Payment')

router.post('/createPayment', Payment.createPayment)
router.post('/listPayment', Payment.listPayment)
router.post('/updatePayment', Payment.updatePayment)
router.post('/deletePayment', Payment.deletePayment)

module.exports = router
