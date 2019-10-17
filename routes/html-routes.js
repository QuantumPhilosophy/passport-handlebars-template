'use strict'

const db = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

module.exports = function (app) {
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/members', isAuthenticated, function (req, res) {
    res.render('members', {
      page: 'Members Page',
      welcomeMessage: 'Hello again World! Welcome to the members page!'
    })
  })

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404', {
      errorMessage: '404 Not Found'
    })
  })
}
