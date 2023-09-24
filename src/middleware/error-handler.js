module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err.response && (err.response.status === 400)) { // axios error
      req.flash('error_messages', `${err.response.data.message}`)
      console.log('第一層ERROR')
    } else if (err instanceof Error) { // api手動觸發的Error
      req.flash('error_messages', `${err.message} ,${err.response.data.message}`)
      console.log('第二層ERROR')
    } else { // 未預期錯誤
      req.flash('error_messages', `${err.name} : ${err.message} ,${err.response.data.message}`)
      console.log('第三層ERROR')
    }
    return res.redirect('back')
  }
}
