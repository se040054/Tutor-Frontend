const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { authenticated } = require('../middleware/auth-handler')
const upload = require('../middleware/multer')
const { generalErrorHandler } = require('../middleware/error-handler')

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
router.put('/users/:id', upload.single('image'), authenticated, userController.putUser)

router.post('/reserve/:lessonId', authenticated, userController.postLesson)
router.delete('/reserve/:lessonId', authenticated, userController.deleteReserve)

router.get('/rating/:reserveId', authenticated, userController.renderRatingForm)
router.post('/rating/:reserveId', authenticated, userController.postRating)

router.use(generalErrorHandler)

module.exports = router
