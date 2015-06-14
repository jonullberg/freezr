'use strict';

var bodyparser = require('body-parser');
var Sql = require('sequelize');
var sql = new Sql('database_name', 'service_account', 'password', {
  dialect: 'postgres'
});

module.exports = function(router) {
  router.use(bodyparser.json());

  //add RESTful APIs here
};
