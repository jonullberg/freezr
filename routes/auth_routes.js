'use strict';

var User = require('../models/User.js');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    console.log(req.body);
    //add layer of protection
    // var newUserData = JSON.parse(JSON.stringify(req.body));
    // delete newUserData.email;
    // delete newUserData.password;

    // var newUser = new User(newUserData);
    // newUser.basic.email = req.body.email;
    // newUser.basic.password = newUser.generateHash(req.body)
  });
};
