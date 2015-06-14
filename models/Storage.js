'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
  dialect: 'postgres'
});

var Storage = module.exports = sql.define('Storage', {
  unitID: {type: Sql.STRING, validate: {
    notEmpty: true}
  },
  itemType: {type: Sql.STRING, validate: {
    notEmpty: true}
  },
  brand: {type: Sql.STRING, validate: {
    notEmpty: true}
  },
  exp: {type: Sql.STRING, validate: {
    notEmpty: true}
  },
  quantity: {type: Sql.INTEGER, validate: {
    notEmpty: true}
  },
  cost: {type: Sql.DECIMAL(10, 2), validate: {
    notEmpty: true}
  }
});

Storage.sync();
