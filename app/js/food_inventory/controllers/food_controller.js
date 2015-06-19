'use strict';

module.exports = function(app) {
  app.controller('foodController', ['$scope', '$location', '$cookies', 'RESTResource', 'foodData', function($scope, $location, $cookies, resource, foodData) {
    //can change name later, Item (single) Items (plural)
    var Item = resource('food_items');
    $scope.showThisForm = false; // jshint ignore:line

    /**
     * Holds all errors during rendering
     * @type {Array}
     */
    $scope.errors = [];
    /**
     * Holds all items from the server
     * @type {Array}
     */
    $scope.allItems = [];
    /**
     * Holds only the items we want to display to user
     * @type {Array}
     */
    $scope.displayedItems = [];

    /**
     * Whill store in the foodData service the object that is clicked, can later be used to populate single_food directive
     * @param  {object} thisItem A single food item object
     */
    $scope.singleFood = foodData.singleFood;

    $scope.saveSingleFood = function(thisItem) {
      $cookies.putObject('singleFood', foodData.store.filter(function(item) {
        return item._id === thisItem._id;
      }));
      foodData.singleFood = foodData.store.filter(function(item) {
          return item._id === thisItem._id;
        });
      $location.path('/item');
    };

    /**
     * add form button controller
     */

    // $scope.addForm = $rootScope.addForm;
    // $scope.showAddForm = function() {
    //   console.log($scope.addForm);
    //   $scope.addForm = !$scope.addForm;
    // };

    $scope.toggleForm = function() {
      if($scope.showThisForm) {
        $scope.showThisForm = false;
        return;
      } else {
        $scope.showThisForm = true;
        return;
      }

    };

    /**
     * Grabs all the items from the server and puts it into an all items variable
     * @param  {Function} callback A function to run on the data
     */
    $scope.getAll = function(callback) {
      Item.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'error retrieving food items'});
        }
        foodData.storeData(data);
        callback(foodData.store);
      });
    };

    /**
     * Finds the number of days left until expiration
     * @param {array} arr Takes an array argument of objects with dates
     */
    $scope.addDaysProperty = function(arr) {
      arr.forEach(function(item) {
        var thisDate = new Date(item.exp);
        item.days = Math.round((thisDate.getTime() - Date.now()) / 86400000);
      });
    };
    /**
     * Grabs all the items from the server and then
     * @param  {number} num   The number of items to take from Array
     * @param  {number} start The starting point to start slicing items off of Array *Optional*
     */
    $scope.getDisplayedItems = function(num, start) {
      $scope.getAll(function(arr) {
        var thisStart = 0;
        if(start) thisStart = start;
        $scope.displayedItems = arr.slice(thisStart, num);
        $scope.addDaysProperty($scope.displayedItems);
      });
    };

    $scope.getDisplayedItems(15); // jshint ignore:line

    /**
     * Takes an item and adds it to foodData service and displayedItems array, then makes create call to REST RESTResource
     * @param  {object} item The item to be created
     */
    $scope.createNewItem = function(item) {
      //insert imageURL to item object depending on itemType
      console.log('createNewItem ran');

      var newItem = item;
      item = null;

      $scope.displayedItems.push(newItem);
      $scope.populateImages(newItem);
      $scope.addDaysProperty($scope.displayedItems);
      foodData.store.push(newItem);
      Item.create(newItem, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not save item: ' + newItem.itemID});
        }

      });
    };

    /**
     * Removes the item from the allItems array while also making remove() call for REST Resource
     * @param  {object} item The item to be removed
     */
    $scope.removeItem = function(item) {
      $scope.displayedItems.splice($scope.displayedItems.indexOf(item), 1);
      Item.remove(item, function(err) {
        if (err) {
          return $scope.errors.push({msg: 'could not remove item: ' + item});
        }
      });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

    /*
      This function populates images for itemType user
      selects upon creating/ adding a new food item.
      This is subject to change if time allows to give
      the user the option to upload their own image.
    */

    //BELOW IMAGES NEED TO BE SAVED AND ADDED TO PROJECT UNDER lib/img

    $scope.populateImages = function(item) {
      if (item.itemType == 'vegetable') {
        item.imageURL = 'css/img/vegetable.jpg';
      }

      if (item.itemType == 'fruit') {
        item.imageURL = 'css/img/fruit.jpg';
      }

      if (item.itemType == 'meat') {
        item.imageURL = 'css/img/meat.jpg';
      }

      if (item.itemType == 'dairy') {
        item.imageURL = 'css/img/dairy.jpg';
      }

      if (item.itemType == 'fish') {
        item.imageURL = 'css/img/fish.jpg';
      }
    };

  }]);
};
