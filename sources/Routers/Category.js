
const express = require('express')
const router = express.Router()

const CategoryController = require('../Controllers/Category')
const AuthController = require('../Controllers/Auth')

router.post('/createCategory', AuthController.auth, CategoryController.createCategory)
router.get('/listCategory', AuthController.auth, CategoryController.listCategory)
router.post('/editCategory', AuthController.auth, CategoryController.editCategory, CategoryController.createCategory)
router.post('/deleteCategory', AuthController.auth, CategoryController.deleteCategory)
router.get('/deleteAllCategory', AuthController.auth, CategoryController.deleteAllCategory)

module.exports = router


// "server": "nodemon sources/index.js",
// "client": "npm start --prefix frontend",
// "dev": "concurrently \"npm run server\" \"npm run client\""