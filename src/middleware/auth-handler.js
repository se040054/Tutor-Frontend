const authenticated = (req, res, next) => {
  const token = req.session.token
  if (!token) {
    req.flash('error_messages', '請先登入')
    return res.redirect('/users/login')
  }
  res.locals.loginUser = req.session.user // 給模板用
  res.locals.token = req.session.token
  next()
}
const authenticatedTeacher = (req, res, next) => {
  const token = req.session.token
  if (!token) {
    req.flash('error_messages', '請先登入')
    return res.redirect('/users/login')
  }
  if (!req.session.user.isTeacher) {
    req.flash('error_messages', '非教師身分')
    return res.redirect('back')
  }
  res.locals.loginUser = req.session.user // 給模板用
  res.locals.token = req.session.token
  next()
}

const authenticatedAdmin = (req, res, next) => {
  const token = req.session.token
  if (!token) {
    req.flash('error_messages', '請先登入')
    return res.redirect('/users/login')
  }
  if (!req.session.user.isAdmin) {
    req.flash('error_messages', '無權使用')
    return res.redirect('back')
  }
  res.locals.loginUser = req.session.user // 給模板用
  res.locals.token = req.session.token
  next()
}

module.exports = {
  authenticated,
  authenticatedTeacher,
  authenticatedAdmin
}
