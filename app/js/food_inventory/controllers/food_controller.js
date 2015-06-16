'use strict';

module.exports = function(app) {
  app.controller('foodController', ['$scope', '$http', 'RESTResource', function($scope, $http, resource) {
    //can change name later, Item (single) Items (plural)
    var Item = resource('items');
    //hold errors
    $scope.errors = [];
    //hold food item objects
    $scope.items = [];

    $scope.getAll = function() {
      Item.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'error retrieving food items'});
        }
        $scope.items = data;
      });
    };

    $scope.createNewItem = function(item) {
      var newItem = item;
      item = null;
      $scope.items.push(newItem);

      Item.create(newItem, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not save item: ' + newItem.itemID});
        }
        $scope.items.splice($scope.items.indexOf(newItem), 1, data);
      });
    };

    $scope.removeItem = function(item) {
      //select item to delete
      $scope.items.splice($scope.items.indexOf(item), 1);
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
