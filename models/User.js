'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
  dialect: 'postgres'
});
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var User = module.exports = sql.define('User', {
  username: {type: Sql.STRING, allowNull: false, unique: true},
  email: {type: Sql.STRING, unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {type: Sql.STRING,
    validate: {
      notEmpty: true,
      notNull: true
    }
  }
}, {
  classMethods: {
    generateHash: function(password, callback) {
      bcrypt.genSalt(8, function(err, salt) {
        if (err) {
          return console.log(err);
        }
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) {
            return console.log(err);
          }
          callback(null, hash);
        });
      });
    },
    checkPassword: function(password, callback) {
      bcrypt.compare(password, this.basic.password, function(err, result) {
        if (err) {
          console.log(err);
          return console.log('there was an error in checking password');
        }
        callback(null, result);
      });
    },
    generateToken: function(secret, callback) {
      eat.encode({id: this.id}, secret, callback);
    }
  }
});

User.sync();
