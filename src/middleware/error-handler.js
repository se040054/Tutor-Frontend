module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err.response && (err.response.status === 400)) { // axios error
      req.flash('error_messages', `${err.response.data.message}`)
    } else if (err instanceof Error) { // 手動觸發的Error
      req.flash('error_messages', `${err.message}`)
    } else { // 未預期錯誤
      req.flash('error_messages', `${err.name} : ${err.message}`)
    }
    return res.redirect('back')
  }
}
