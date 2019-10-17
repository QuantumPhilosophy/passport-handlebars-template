'use strict'

// Requiring our models and passport as we've configured it
const db = require('../models')


module.exports = function (app) {
  app.get('/api', function (req, res) {
    res.json('Hello World!')
  })
}
