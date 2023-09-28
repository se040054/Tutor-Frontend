const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy

const axios = require('axios')

const instance = axios.create({
  baseURL: `${process.env.API_BASE_URL}:${process.env.API_PORT}/api/`
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['email', 'profile'],
  state: true,
  passReqToCallback: true
},
(req, accessToken, refreshToken, profile, cb) => {
  const user = profile._json
  return instance.post('/users/googleLogin',
    {
      email: user.email,
      name: user.name
    })
    .then(response => {
      req.session.token = response.data.data.data.token
      req.session.user = response.data.data.data.user
      return cb(null)
    })
    .catch(err => {
      err.errorMessage = '使用GOOGLE登入失敗'
      return cb(err)
    })
}))

module.exports = passport
