'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('food controller', function() {
  //this is the controller constructor
  var $CC;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('freezrApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    //this creates a fresh scope before each test
    $scope = $rootScope.$new();
    //this creates a fresh controller before each test
    $CC = $controller;
  }));

  it('should be able to create a new controller', function() {
    //the $scope assignment sets your $scope declaration as an actual $rootScope
    var foodController = $CC('foodController', {$scope: $scope});

    expect(typeof foodController).toBe('object');
    expect(Array.isArray($scope.allItems)).toBe(true);
    expect(Array.isArray($scope.displayedItems)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.foodController = $CC('foodController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request', function() {
      $httpBackend.expectGET('/api/food_items').respond(200, [{_id: '1', itemType: 'test', itemName: 'apple', imageURL: 'url', caption: 'caption', exp: '01.02.2012', qty: 1, qtyType: 'type', cost: 2, storageType: 'freezer'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.allItems[0].itemName).toBe('apple');
      expect($scope.allItems[0]._id).toBe('1');
    });

    it('should correctly handle errors', function() {
      $httpBackend.expectGET('/api/food_items').respond(500, {msg: 'server error'});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving food items');
    });

    it('should be able to POST a new food item object', function() {
      $scope.newItem = {_id: '2', itemType: 'test', itemName: 'banana', imageURL: 'url', caption: 'caption', exp: '01.02.2012', qty: 1, qtyType: 'type', cost: 2, storageType: 'freezer'};
      $httpBackend.expectPOST('/api/food_items').respond(200, {_id: '2', itemType: 'test', itemName: 'banana', imageURL: 'url', caption: 'caption', exp: '01.02.2012', qty: 1, qtyType: 'type', cost: 2, storageType: 'freezer'});
      $scope.createNewItem($scope.newItem);
      $httpBackend.flush();
      //if there are no items in an array it returns -1,
      //we want there to be something
      expect($scope.allItems[0].itemName).toBe('banana');
      expect($scope.allItems[0]._id).toBe('2');
    });

    it('should be able to handle a POST error', function() {
      $scope.newItem = {_id: '2', itemType: 'test', itemName: 'banana', imageURL: 'url', caption: 'caption', exp: '01.02.2012', qty: 1, qtyType: 'type', cost: 2, storageType: 'freezer'};
      $httpBackend.expectPOST('/api/food_items').respond(500, {msg: 'could not save item'});
      $scope.createNewItem($scope.newItem);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
    });

    it('should DELETE a food item', function() {
      //add code here
    });

    it('should DELETE a food item on server error', function() {
      //add code here
    });

    it('should update an existing food item, PUT', function() {
      //add code here
    });

    it('should update an existing food item on server error', function() {
      //add code here
    });
  });
});
