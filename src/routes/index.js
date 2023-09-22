const express = require('express')
const router = express.Router()

const users = require('./users')
const auth = require('./auth')
const home = require('./home')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth-handler')

router.get('/', (req, res) => res.redirect('/dev_home'))

router.get('/dev_home', authenticated, (req, res) => {
  const { token, user } = req.session
  return res.render('dev/dev_home', { token, user })
})

router.use(users)
router.use(auth)
router.use(home)

router.use(generalErrorHandler)

module.exports = router
