'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    return console.log(req.body);
  });
};
