'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var validator = require('validator');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    //add layer of protection
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;

    var newUser = new User(newUserData);

    if (validator.isNull(req.body.email)) {
      return res.status(417).json({msg: 'email is required'});
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(417).json({msg: 'invalid email'});
    }

    if (validator.isNull(req.body.username)) {
      return res.status(417).json({msg: 'username is required'});
    }

    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not save password'});
      }

      newUser.basic.password = hash;

      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'could not create user'});
        }

        user.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
          }

          res.json({
            token: token
          });
        });//end generateToken
      });//end save
    });//end generateHash
  });//end POST

  router.get('/sign_in', passport.authenticate('basic', {session:false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'error generating token'});
      }

      res.json({msg: 'authenticated as: ' + req.user.basic.email, username: req.user.username, token: token});
    });//end generateToken
  });//end GET
};
