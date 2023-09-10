const axios = require('axios')
const instance = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}/api/`
})

const userController = {
  renderRegister: (req, res) => {
    res.render('user/register')
  },
  renderLogin: (req, res) => {
    res.render('user/login')
  },
  postRegister: (req, res, next) => {
    const { email, password, confirmPassword } = req.body
    if (!email || !password || !confirmPassword) throw new Error('信箱、密碼、確認密碼不能為空')
    if (password !== confirmPassword) throw new Error('密碼不一致')
    return instance.post('/users/register',
      {
        email,
        password,
        confirmPassword
      }
    )
      .then(response => {
        if (response.data.data) { // 因為res的資料會有一層data api的資料也叫做data 所以兩層
          req.flash('success_messages', '創建帳號成功')
          return res.redirect('/users/login')
        }
      })
      .catch(err => {
        console.log(err)
        return next(err)
      })
  }
}
module.exports = userController
