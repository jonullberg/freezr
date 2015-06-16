'use strict';

module.exports = function(app) {
  app.controller('foodController', ['$scope', '$http', 'RESTResource', function($scope, $http, resource) {
    //can change name later, Item (single) Items (plural)
    var Item = resource('food_items');
    //hold errors
    $scope.errors = [];
    //hold food item objects
    $scope.allItems = [];
    $scope.displayedItems = [];

    $scope.getDisplayedItems = function(num, start) {
      var thisStart = 0;
      if(start) thisStart = start;
      $scope.getAll();
      $scope.displayedItems = $scope.allItems.slice(start, num);
    };

    $scope.getAll = function() {
      Item.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'error retrieving food items'});
        }
        $scope.allItems = data;
      });
    };

    $scope.createNewItem = function(item) {
      var newItem = item;
      item = null;
      $scope.allItems.push(newItem);
      console.log($scope.allItems);
      Item.create(newItem, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not save item: ' + newItem.itemID});
        }
        $scope.allItems.splice($scope.allItems.indexOf(newItem), 1, data);
      });
    };

    $scope.removeItem = function(item) {
      //select item to delete
      $scope.allItems.splice($scope.allItems.indexOf(item), 1);
      //delete item selected
      Item.remove(item, function(err) {
        if (err) {
          return $scope.errors.push({msg: 'could not remove item: ' + item});
        }
      });
    };

    /*
      TODO: Need to decide on whether we will allow
      editing of food items being inserted. If so, what
      will we allow to edit?
      TODO: This is related to food/inventory schema
    */

    $scope.saveItem = function(item) {
      //add code here
    };

    $scope.editItem = function(item) {
      //add code here
    };

    $scope.cancelEditing = function(item) {
      //add code here
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
