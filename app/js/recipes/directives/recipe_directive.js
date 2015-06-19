'use strict';

var fakeData = require('../../../../lib/test/fake_recipe_data2.js');


module.exports = function(app) {
  app.directive('recipeDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/recipes.html',
      scope: {
        recipes: '=',
        getRecipes: '='
      },
      transclude: true,
      controller: ['$scope', function($scope) {
        return {
          recipes: [],
          getRecipes: function(data, num) {
            console.log('hit getRecipes');
          }

        };
        // getRecipes(fakeData.matches, 4);
      }]
    };
  });
};
