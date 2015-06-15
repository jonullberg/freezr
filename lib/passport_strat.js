'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User.js');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      if (err) {
        return done('database error');
      }

      if (!user) {
        return done('no such user');
      }

      user.checkPassword(password, function(err, result) {
        if (err) {
          return console.log(err);
        }

        if (result) {
          return done(null, user);
        } else {
          return done('wrong password');
        }
      });//end checkPassword
    });//end findOne
  }));//end passport
};
