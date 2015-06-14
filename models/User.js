'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
  dialect: 'postgres'
});

var User = module.exports = sql.define('User', {
  username: {type: Sql.STRING, allowNull: false, unique: true},
  basic: {
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
  }
});

User.sync();
