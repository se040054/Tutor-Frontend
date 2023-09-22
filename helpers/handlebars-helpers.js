const moment = require('moment')
require('moment-timezone').tz.setDefault('Asia/Taipei')

const ifCond = function (a, b, options) { // 不能用箭頭函式，否則this會指向外部
  return a === b ? options.fn(this) : options.inverse(this) // 注意這個this會指向ifCont
}

const defaultAvatar = '/images/avatar01.png'

const TSTTime = (time) => {
  const day = moment(time).format('YYYY-MM-DD')
  const hourMin = moment(time).format('HH:mm')
  return `${day} ${hourMin}`
}

const now = moment().format('YYYY-MM-DDTHH:mm')

const api = `http://localhost:${process.env.API_PORT}/`

const increment1 = (value) => {
  return Number(value) + 1
}

module.exports = {
  ifCond,
  defaultAvatar,
  TSTTime,
  api,
  increment1,
  now
}
