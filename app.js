require('dotenv').config({ path: './environment/dev/.env' })

const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = process.env.PORT
const flash = require('connect-flash')
const session = require('express-session')

const messageHandler = require('./src/middleware/message-handler')
const pages = require('./src/routes/index')

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

app.use(pages)

app.listen(port, () => {
  console.info(`http://localhost:${port}`)
})
