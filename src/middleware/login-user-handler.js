module.exports = (req, res, next) => {
  res.locals.loginUser = req.user
  next()
}
