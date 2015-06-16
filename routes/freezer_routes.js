'use strict';

var bodyparser = require('body-parser');
var Items = require('../models/Items.js');
var eatAuth = require('../lib/eat_auth.js')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  //add RESTful APIs here
  router.post('/food_items', function(req, res) {
    var newItem = new Items(req.body);
    newItem.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });//end POST

  router.get('/food_items', function(req, res) {
    Items.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });//end GET

  /*TODO ~~~~~~~
  * need to add filter search GET request
  */

  //remove comment later, this is only so i can commit a change to close a waffle ticket
};
