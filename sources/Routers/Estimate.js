

const express = require('express')
const router = express.Router()

const Estimate = require('../Controllers/Estimate')
const AuthController = require('../Controllers/Auth')

router.post('/createEstimate', AuthController.auth, Estimate.createEstimate)
router.get('/readEstimate', AuthController.auth, Estimate.readEstimate)
router.post('/updateEstimate', AuthController.auth, Estimate.updateEstimate)
router.post('/updateEstimateStates', AuthController.auth, Estimate.updateEstimateStates)
router.post('/updateEstimateStatesName', AuthController.auth, Estimate.updateEstimateStatesName)
router.post('/updateEstimateSignature', AuthController.auth, Estimate.updateEstimateSignature)
router.post('/deleteEstimate', AuthController.auth, Estimate.deleteEstimate)

module.exports = router

