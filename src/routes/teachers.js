const express = require('express')
const router = express.Router()
const { authenticatedTeacher, authenticated } = require('../middleware/auth-handler')
const teacherController = require('../controllers/teacher-controller')

router.get('/teachers/addLesson', authenticatedTeacher, teacherController.renderAddLesson)
router.post('/teachers/addLesson', authenticatedTeacher, teacherController.postAddLesson)
module.exports = router

