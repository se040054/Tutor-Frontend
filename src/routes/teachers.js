const express = require('express')
const router = express.Router()
const { authenticatedTeacher, authenticated } = require('../middleware/auth-handler')
const teacherController = require('../controllers/teacher-controller')

router.get('/teachers/addLesson', authenticatedTeacher, teacherController.renderAddLesson)
router.post('/teachers/addLesson', authenticatedTeacher, teacherController.postAddLesson)

router.get('/teachers/me', authenticatedTeacher, teacherController.renderMe)
router.get('/teachers/:id', authenticated, teacherController.renderTeacher)
router.get('/teachers/:id/edit', authenticatedTeacher, teacherController.renderTeacherEdit)
router.put('/teachers/:id', authenticatedTeacher, teacherController.putTeacher)
module.exports = router
