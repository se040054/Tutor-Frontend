const moment = require('moment')
require('moment-timezone').tz.setDefault('Asia/Taipei')
const axios = require('axios')
const { response } = require('express')
const instance = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}/api/`
})

const teacherController = {
  renderAddLesson: (req, res) => {
    return res.render('teacher/addLesson')
  },
  postAddLesson: (req, res, next) => {
    const { duration, daytime } = req.body
    if (!duration || !daytime) {
      req.flash('error_messages', '請輸入時間和日期')
      return res.redirect('back')
    }
    if (moment(daytime).isSameOrBefore(moment())) {
      req.flash('error_messages', '創建時間不能早於現在')
      return res.redirect('back')
    }
    if (daytime < 30 || daytime > 480) {
      req.flash('error_messages', '創建時長不正確')
      return res.redirect('back')
    }
    return instance.post('/teachers/addLesson', {
      duration, daytime
    }, { headers: { Authorization: `Bearer ${req.session.token}` } })
      .then(response => {
        if (response.status === 200) {
          req.flash('success_messages', '新增課程成功')
          return res.redirect('/teachers/me') // (!) 以後記得改
        }
      })
      .catch(err => next(err))
  },
  renderTeacher: (req, res, next) => {
    instance.get(`/teachers/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    }).then(response => {
      const { teacher, highestRatingLessons, lowestRatingLessons } = response.data.data
      const ratings = []
      highestRatingLessons.concat(lowestRatingLessons).forEach(lesson => {
        ratings.push(lesson.Reserve.Rating)
      })
      const set = new Set()
      let resultRatings = ratings.filter(rating => !set.has(rating.id) ? set.add(rating.id) : false)
      resultRatings = resultRatings.sort((a, b) => b.score - a.score)
      return res.render('teacher/teacher', { teacher, ratings: resultRatings })
    }).catch(err => next(err))
  },
  renderMe: (req, res, next) => {
    return instance.get('/teachers/me', {
      headers: { Authorization: `Bearer ${req.session.token}` }
    })
      .then(response => {
        const { teacher } = response.data.data
        const reserveLessons = []
        const lessonHistory = []
        const releaseLessons = []
        teacher.Lessons.forEach(lesson => {
          if (lesson.isReserved && moment(lesson.daytime).isAfter(moment())) {
            reserveLessons.push(lesson)
          } else if (lesson.isReserved && moment(lesson.daytime).isBefore(moment())) {
            lessonHistory.push(lesson)
          } else {
            releaseLessons.push(lesson)
          }
        })
        return res.render('teacher/me', { teacher, reserveLessons, lessonHistory, releaseLessons })
      })
      .catch(err => next(err))
  },
  renderTeacherEdit: (req, res, next) => {
    return instance.get(`/teachers/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    })
      .then(response => {
        const teacher = response.data.data.teacher
        return res.render('teacher/editProfile', { teacher })
      })
      .catch(err => next(err))
  },
  putTeacher: (req, res, next) => {
    const { id } = req.params
    const { courseIntroduce, teachStyle, courseUrl } = req.body
    if (!courseIntroduce && !teachStyle && !courseUrl) {
      req.flash('error_messages', '未進行任何修改')
      return res.redirect('back')
    }
    instance.put(`/teachers/${id}`, {
      courseIntroduce, teachStyle, courseUrl
    }, {
      headers: {
        Authorization: `Bearer ${req.session.token}`
      }
    }).then(response => {
      if (response.status === 200) {
        req.flash('success_messages', '修改教師資料成功')
        return res.redirect('/teachers/me')
      }
    }).catch(err => next(err))
  }
}

module.exports = teacherController
