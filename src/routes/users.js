const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router.get('/users/register', userController.renderRegister)
router.post('/users/register', userController.postRegister)
router.get('/users/login', userController.renderLogin)
router.post('/users/login', userController.postLogin)
module.exports = router
