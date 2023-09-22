const express = require('express')
const router = express.Router()
const { authenticated } = require('../middleware/auth-handler')
const { getPagination } = require('../../helpers/pagination-helper')
const axios = require('axios')
const instance = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}/api/`
})

router.get('/home', authenticated, async (req, res, next) => {
  try {
    const usersRes = await instance.get('/users/topLearningUsers',
      { headers: { Authorization: `Bearer ${req.session.token}` } }
    ).catch(err => next(err))
    const TEACHERS_PER_PAGE = 6
    const { page, search } = req.query
    const teachersRes = await instance.get('/teachers', {
      params: {
        amount: TEACHERS_PER_PAGE,
        page,
        search
      },
      headers: { Authorization: `Bearer ${req.session.token}` }
    }).catch(err => next(err))
    const topLearningUsers = usersRes.data.data.users
    const { teachers, totalAmount } = teachersRes.data.data
    if (usersRes.status === 200 && teachersRes.status === 200) {
      // console.log(teachers)
      return res.render('home', {
        topLearningUsers,
        teachers,
        search,
        pagination: getPagination(TEACHERS_PER_PAGE, page, totalAmount)
      })
    }
  } catch (err) {
    return next(err)
  }
})

module.exports = router
