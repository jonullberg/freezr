'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('food controller', function() {
  //this is the controller constructor
  var $ControllerConstructor;
  var $scope;
  var $location;
  var foodData;
  var fakeData = {
    _id: 'myId'
  };
  var fakeStoreData = [
    {
      _id: 'myId',
      name: 'myName'
    },
    {
      _id: 'fakeId',
      name: 'fakeName'
    }
  ];

  beforeEach(angular.mock.module('freezrApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    //this creates a fresh scope before each test
    $scope = $rootScope.$new();
    //this creates a fresh controller before each test
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function() {
    //the $scope assignment sets your $scope declaration as an actual $rootScope
    var foodController = $ControllerConstructor('foodController', {$scope: $scope});

    expect(typeof foodController).toBe('object');
    expect(Array.isArray($scope.allItems)).toBe(true);
    expect(Array.isArray($scope.displayedItems)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.saveSingleFood).toBe('function');
    expect(typeof $scope.getAll).toBe('function');
    expect(typeof $scope.addDaysProperty).toBe('function');
    expect(typeof $scope.getDisplayedItems).toBe('function');
    expect(typeof $scope.createNewItem).toBe('function');
    expect(typeof $scope.removeItem).toBe('function');
    expect(typeof $scope.clearErrors).toBe('function');
    expect(typeof $scope.populateImages).toBe('function');
    expect(typeof $scope.editItem).toBe('function');
    expect(typeof $scope.cancelEditing).toBe('function');

  });
  describe('Food controller functions', function() {
    beforeEach(angular.mock.inject(function(_$location_, _foodData_) {
      $location = _$location_;
      foodData = _foodData_;
      this.foodController = $ControllerConstructor('foodController', {$scope: $scope});
      foodData.storeData(fakeStoreData);
    }));

    describe('Saving Single Food function', function() {

      it('Should store a single food on foodData.singleFood', function() {
        $scope.saveSingleFood(fakeData);
        expect(foodData.singleFood[0].name).toBe('myName');
        expect($location.path()).toBe('/item');
      });
    });

  });
});
