'use strict';
var fakeData = require('../../../../lib/test/fake_recipe_data2.js');

module.exports = function(app) {
  app.controller('singleFoodController', ['$scope', '$cookies', 'RESTResource', 'foodData', function($scope, $cookies, resource, foodData) {
    //can change name later, Item (single) Items (plural)
    var Item = resource('food_items');

    $scope.errors = [];

    $scope.recipes = [];

    function getRecipes() {
      $scope.recipes = fakeData.recipes.slice(0, 4);
      console.log($scope.recipes);
    }

    getRecipes();

    function makeCookie() {
      if(foodData.singleFood === null) {
        $scope.singleFood = $cookies.getObject('singleFood');
      } else {
        $scope.singleFood = foodData.singleFood;
      }

      $cookies.putObject('singleFood', $scope.singleFood);
    }

    makeCookie();

    $scope.addDaysProperty = function(arr) {
      arr.forEach(function(item) {
        var thisDate = new Date(item.exp);
        item.days = Math.round((thisDate.getTime() - Date.now()) / 86400000);
      });
    };

    $scope.addDaysProperty($scope.singleFood);

    // console.log($cookies.getObject('singleFood'));
    // console.log($scope.singleFood);

    $scope.saveItem = function(item) {
      //reset editing status
      item.editing = false;
      Item.save(item, function(err, data) {
        if (err) {
          console.log(err);
          $scope.errors.push({msg: 'could not save changes'});
        }
      });
      makeCookie();
    };

    $scope.editItem = function(item) {
      item.editing = true;
      //save a copy of original object
      $scope.tempItem = angular.copy(item);
    };

    $scope.cancelEditing = function(item) {
      item.editing = false;

      if (item !== $scope.tempItem) {
        if (item.itemName !== $scope.tempItem.itemName) {
          item.itemName = $scope.tempItem.itemName;
        }
        if (item.itemType !== $scope.tempItem.itemType) {
          item.itemType = $scope.tempItem.itemType;
        }
        if (item.exp !== $scope.tempItem.exp) {
          item.exp = $scope.tempItem.exp;
        }
        if (item.qty !== $scope.tempItem.qty) {
          item.qty = $scope.tempItem.qty;
        }
        if (item.qtyType !== $scope.tempItem.qtyType) {
          item.qtyType = $scope.tempItem.qtyType;
        }
        if (item.cost !== $scope.tempItem.cost) {
          item.cost = $scope.tempItem.cost;
        }
        if (item.storageType !== $scope.tempItem.storageType) {
          item.storageType = $scope.tempItem.storageType;
        }
      }

      //set object to null for next edit
      $scope.tempItem = null;
    };

  }]);
};

