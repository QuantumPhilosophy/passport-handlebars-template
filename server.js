'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const exphbs = require('express-handlebars')
const passport = require('./config/passport')

// Setting up port
const PORT = process.env.PORT || 8080

// Import the models folder
const db = require('./models')

// Creating express app
const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Setting public directory
app.use(express.static('public'))

// We need to use sessions to keep track of our user's login status
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// Handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

// Requiring our routes
require('./routes/auth-routes')(app)
require('./routes/html-routes')(app)
require('./routes/api-routes')(app)

// This will listen to and show all activities on our terminal to
// let us know what is happening in our app
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
  })
})
