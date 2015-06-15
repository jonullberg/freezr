'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var Sequelize = require('sequelize');
var sql = new Sequelize(process.env.PG_DATABSE || 'freezer_dev', process.env.PG_USER || 'freezer_dev', process.env.PG_PASS || 'foobar123', {
  dialect: 'postgres'
});

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    sql.sync()
      .then(function() {
        var newUserData = JSON.parse(JSON.stringify(req.body));
        delete newUserData.email;
        delete newUserData.password;

        var newUser = new User(newUserData);
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(req.body.password, function(err, hash) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'could not save password'});
          }

          newUser.password = hash;
        });//end generateHash

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

            res.json({token: token});
          });//end generateToken
        });//end newUser.save()
      })
      .error(function(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      });
  });//end POST
};
