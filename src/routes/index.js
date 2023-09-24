const express = require('express')
const router = express.Router()

const users = require('./users')
const auth = require('./auth')
const home = require('./home')
const teachers = require('./teachers')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/', (req, res) => res.redirect('/home'))

router.use(users)
router.use(auth)
router.use(home)
router.use(teachers)

router.use(generalErrorHandler)

// router.use('/', (req, res) => res.redirect('/home'))

module.exports = router
