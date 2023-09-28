if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './environment/prod/.env' })
}

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './environment/dev/.env' })
}

const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.engine('hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))

const flash = require('connect-flash')
const session = require('express-session')

const messageHandler = require('./src/middleware/message-handler')
const pages = require('./src/routes/index')

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

app.listen(process.env.port, () => {
  console.log(`目前為:${process.env.NODE_ENV} 環境`)
  console.info(`http://localhost:${process.env.port}`)
})
