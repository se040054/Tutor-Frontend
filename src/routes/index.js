const express = require('express')
const router = express.Router()

const users = require('./users')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, authenticatedTeacher } = require('../middleware/auth-handler')

router.get('/', (req, res) => res.redirect('/home'))
router.get('/home', authenticated, (req, res) => {
  const { token, user } = req.session
  return res.render('dev/dev_home', { token, user })
})

router.use(users)

router.use(generalErrorHandler)

module.exports = router
