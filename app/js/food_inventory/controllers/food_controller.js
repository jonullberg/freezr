'use strict';

module.exports = function(app) {
  app.controller('foodController', ['$scope', '$location', 'RESTResource', 'foodData', function($scope, $location, resource, foodData) {
    //can change name later, Item (single) Items (plural)
    var Item = resource('food_items');
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
      foodData.singleFood = foodData.store.filter(function(item) {
          return item._id === thisItem._id;
        });
      $location.path('/item');
    },

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
    },

    $scope.addDaysProperty = function(arr) {
      arr.forEach(function(item) {
        var thisDate = new Date(item.exp);
        item.days = Math.round((thisDate.getTime() - Date.now()) / 86400000);
      });
    },
    /**
     * Grabs all the items from the server and then
     * @param  {[type]} num   [description]
     * @param  {[type]} start [description]
     * @return {[type]}       [description]
     */
    $scope.getDisplayedItems = function(num, start) {
      $scope.getAll(function(arr) {
        var thisStart = 0;
        if(start) thisStart = start;
        $scope.displayedItems = arr.slice(thisStart, num);
        $scope.addDaysProperty($scope.displayedItems);
      });
    },

    $scope.getDisplayedItems(15); // jshint ignore:line

    $scope.createNewItem = function(item) {
      //insert imageURL to item object depending on itemType
      $scope.populateImages(item);

      var newItem = item;
      item = null;

      $scope.displayedItems.push(newItem);
      $scope.addDaysProperty($scope.displayedItems);
      foodData.store.push(newItem);
      Item.create(newItem, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not save item: ' + newItem.itemID});
        }

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

    // $scope.saveItem = function(item) {
    //   //reset editing status
    //   item.editing = false;
    //   Item.save(item, function(err, data) {
    //     if (err) {
    //       console.log(err);
    //       $scope.errors.push({msg: 'could not save changes'});
    //     }
    //   })
    // };

    // $scope.editItem = function(item) {
    //   item.editing = true;
    //   //save a copy of original object
    //   $scope.tempItem = angular.copy(item);
    // };

    // $scope.cancelEditing = function(item) {
    //   item.editing = false;

    //   if (item !== $scope.tempItem) {
    //     if (item.itemName !== $scope.tempItem.itemName) {
    //       item.itemName = $scope.tempItem.itemName;
    //     }
    //     if (item.itemType !== $scope.tempItem.itemType) {
    //       item.itemType = $scope.tempItem.itemType;
    //     }
    //     if (item.exp !== $scope.tempItem.exp) {
    //       item.exp = $scope.tempItem.exp;
    //     }
    //     if (item.qty !== $scope.tempItem.qty) {
    //       item.qty = $scope.tempItem.qty;
    //     }
    //     if (item.qtyType !== $scope.tempItem.qtyType) {
    //       item.qtyType = $scope.tempItem.qtyType;
    //     }
    //     if (item.cost !== $scope.tempItem.cost) {
    //       item.cost = $scope.tempItem.cost;
    //     }
    //     if (item.storageType !== $scope.tempItem.storageType) {
    //       item.storageType = $scope.tempItem.storageType;
    //     }
    //   }

    //   //set object to null for next edit
    //   $scope.tempItem = null;
    // };

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
        item.imageURL = 'http://news.psu.edu/sites/default/files/styles/threshold-992/public/FarmMarket_NatalieMaynor_Flickr.jpg';
      }

      if (item.itemType == 'fruit') {
        item.imageURL = 'http://modernfarmer.com/wp-content/uploads/2014/06/berry_basket.jpg';
      }

      if (item.itemType == 'meat') {
        item.imageURL = 'http://www.countryvalley.co.uk/images/country-valley-foods-small-bbq-meat-box-hamper-p82-117_zoom.jpg';
      }

      if (item.itemType == 'dairy') {
        item.imageURL = 'http://svsaqua.com/wp-content/uploads/2013/09/dairy-products-300x207.jpg';
      }

      if (item.itemType == 'fish') {
        item.imageURL = 'http://knowyourliver.net/wp-content/uploads/2014/10/cooked-fish-images-kthc5gxn.jpg';
      }
    };

  }]);
};
