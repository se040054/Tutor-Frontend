const passport = require('passport')

const { User } = require('../models')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy(
  // 客製化欄位資料+選項
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // 此次生命週期登入後回調函式把user丟進req.user(下面記得加req)
  },
  // 驗證登入流程
  (req, email, password, cb) => { // 這裡的req是上面的回調函式需要用的 不能移除
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return cb(new Error('用戶不存在'), false)
        bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) return cb(new Error('密碼錯誤'), false)
            return cb(null, user)
          })
      })
      .catch(err => cb(err))
  }
))

// passport.serializeUser((user, cb) => {
//   cb(null, user.id)
// })
// passport.deserializeUser((id, cb) => {
//   return User.findByPk(id)
//     .then(user => cb(null, user.toJSON()))
//     .catch(err => cb(err))
// })

module.exports = passport
