'use strict';

/*this file is middleware to force users to login, 
locks down routes (requires login)*/
var eat = require('eat');
var User = require('../models/User.js');

module.exports = function(secret) {
  /*return a function that gets passed, this is
  a closure*/
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if(!token) {
      console.log('unauthorized, no token in request');
      return res.status(401).json({msg: 'not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if(err) {
        console.log(err);
        res.status(401).json({msg: 'not authorized'});
      }

      /*this is where the function you're returning 
      gets plugged into (from line 11)*/
      User.findOne({_id: decoded.id}, function(err, user) {
        if(err) {
          console.log(err);
          return res.status(401).json({msg: 'not authorized'});
        }

        if(!user) {
          console.log('no user found for that token');
          return res.status(401).json({msg: 'not authorized'});
        }

        req.user = user;
        next();
      });
    });
  };
};