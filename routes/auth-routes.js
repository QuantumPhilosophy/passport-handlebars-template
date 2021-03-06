'use strict'

const db = require('../models')
const passport = require('../config/passport')

module.exports = function (app) {
  app.get('/', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render('members', {
        page: 'Members Page',
        welcomeMessage: 'Hello again World! Welcome to the members page!'
      })
    } else {
      res.render('signup', {
        page: 'Signup Page',
        welcomeMessage: 'Hello World! Please signup below.'
      })
    }
  })

  app.get('/login', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members')
    } else {
      res.render('login', {
        page: 'Login Page',
        welcomeMessage: 'Hello World! Please login below.'
      })
    }
  })

  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.end()
  })

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob
    }).then(function () {
      res.redirect(307, '/api/login')
    }).catch(function (err) {
      console.log(err)
      res.json(err)
    })
  })

  // Route for logging user out
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({})
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      })
    }
  })
}
