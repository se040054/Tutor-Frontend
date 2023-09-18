const express = require('express')
const router = express.Router()

const users = require('./users')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use(users)
router.use(generalErrorHandler)

module.exports = router
