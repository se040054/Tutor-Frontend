const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.get('/users/register', userController.renderRegister)
router.post('/users/register', userController.postRegister)
router.get('/users/login', userController.renderLogin)

router.use(generalErrorHandler)

module.exports = router
