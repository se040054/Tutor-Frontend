const express = require('express')
const router = express.Router()

const users = require('./users')
const auth = require('./auth')
const home = require('./home')
const teachers = require('./teachers')
const admin = require('./admin')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/', (req, res) => res.redirect('/users/login'))

router.use(users)
router.use(auth)
router.use(home)
router.use(teachers)
router.use(admin)

router.use(generalErrorHandler)

router.use('/', (req, res) => res.redirect('/users/login'))

module.exports = router
