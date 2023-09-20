const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/users/login',
    successReturnToOrRedirect: '/home',
    failureFlash: true
  })
)

module.exports = router
