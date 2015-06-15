'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
  dialect: 'postgres'
});

var Items = module.exports = sql.define('Items', {
  itemID: {type: Sql.STRING, validate: {
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
  qty: {type: Sql.INTEGER, validate: {
    notEmpty: true}
  },
  cost: {type: Sql.DECIMAL(10, 2), validate: {
    notEmpty: true}
  },
  storageType: {type: Sql.STRING, validate: {
    notEmpty: true}
  }
});

Items.sync();
