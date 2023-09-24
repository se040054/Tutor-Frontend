const express = require('express')
const { authenticatedAdmin } = require('../middleware/auth-handler')
const adminController = require('../controllers/admin-controller')
const router = express.Router()

router.get('/admin/users', authenticatedAdmin, adminController.renderUsers)

module.exports = router
