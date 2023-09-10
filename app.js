require('dotenv').config()

const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = process.env.PORT
const flash = require('connect-flash')
const session = require('express-session')

const messageHandler = require('./middleware/message-handler')
const loginUserHandler = require('./middleware/login-user-handler')
const { pages } = require('./routes')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use(messageHandler)
app.use(loginUserHandler)

app.use(pages)

app.get('/', (req, res) => {
  res.render('dev/dev_home')
})

app.listen(port, () => {
  console.info(`http://localhost:${port}`)
})
