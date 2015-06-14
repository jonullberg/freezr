'use strict';

var bodyparser = require('body-parser');
var Storage = require('../models/Storage.js');
var Sql = require('sequelize');
var sql = new Sql('freezer_dev', 'freezer_dev', 'foobar123', {
  dialect: 'postgres'
});

module.exports = function(router) {
  router.use(bodyparser.json());

  //add RESTful APIs here
  router.post('/storage', function(req, res) {
    sql.sync()
      .then(function() {
        Storage.create(req.body)
          .then(function(data) {
            res.json(data);
          })
          .error(function(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          });
      });
  });

  router.get('/storage', function(req, res) {
    sql.sync()
      .then(function() {
        Storage.all()
          .then(function(data) {
            res.json(data);
          })
          .error(function(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          });
      });
  });


};
