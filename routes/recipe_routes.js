'use strict';

var bodyparser = require('body-parser');
var request = require('superagent');

var apiKey = '571b18999a49c04ce8f405766c96fd3b';

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/recipes/:name', function(req, response) {
    var foodName = req.params.name;
    request('http://food2fork.com/api/search?key=' + apiKey + '&q=' + foodName)
      .end(function(err, res) {
        var myResponse = JSON.parse(res.text);
        var recipes = myResponse.recipes;
        response.json(recipes);
      });
  });
};
