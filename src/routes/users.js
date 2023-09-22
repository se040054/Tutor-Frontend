const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { authenticated } = require('../middleware/auth-handler')

router.get('/users/register', userController.renderRegister)
router.post('/users/register', userController.postRegister)
router.get('/users/login', userController.renderLogin)
router.post('/users/login', userController.postLogin)
router.get('/users/logout', authenticated, userController.logout)
router.get('/users/applyTeacher', authenticated, userController.renderApplyTeacher)
router.post('/users/applyTeacher', authenticated, userController.postApplyTeacher)

router.get('/users/topLearningUsers')
router.get('/users/:id', authenticated, userController.renderUser)
router.get('/users/:id/editProfile', authenticated, userController.renderUserEdit)
router.put('/users/:id', authenticated, userController.putUser)
module.exports = router
