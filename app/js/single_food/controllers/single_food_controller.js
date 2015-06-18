'use strict';

module.exports = function(app) {
  app.controller('singleFoodController', ['$scope', '$cookies', 'RESTResource', 'foodData', function($scope, $cookies, resource, foodData) {
    //can change name later, Item (single) Items (plural)
    var Item = resource('food_items');

    $scope.errors = [];

    if(foodData.singleFood === null) {
      $scope.singleFood = $cookies.getObject('singleFood');
    } else {
      $scope.singleFood = foodData.singleFood;
    };

    $cookies.putObject('singleFood', $scope.singleFood);

    $scope.addDaysProperty = function(arr) {
      arr.forEach(function(item) {
        var thisDate = new Date(item.exp);
        item.days = Math.round((thisDate.getTime() - Date.now()) / 86400000);
      });
    };

    $scope.addDaysProperty($scope.singleFood);

    console.log($cookies.getObject('singleFood'));
    console.log($scope.singleFood);

  }]);
};

