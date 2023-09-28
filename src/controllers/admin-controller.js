const axios = require('axios')
const instance = axios.create({
  baseURL: `${process.env.API_BASE_URL}:${process.env.API_PORT}/api/`
})

const { getPagination } = require('../../helpers/pagination-helper')

const adminController = {
  renderUsers: async (req, res, next) => {
    try {
      const { page, search } = req.query
      const USER_PER_PAGE = 7
      const response = await instance.get('/admin/users', {
        params: {
          page,
          search,
          amount: USER_PER_PAGE
        },
        headers: { Authorization: `Bearer ${req.session.token}` }
      }).catch(err => next(err))
      const { users, totalAmount } = response.data.data
      return res.render('admin/users', {
        users,
        search,
        pagination: getPagination(USER_PER_PAGE, page, totalAmount)
      })
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}

module.exports = adminController
