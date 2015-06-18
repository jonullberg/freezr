'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('food controller', function() {
  //this is the controller constructor
  var $ControllerConstructor;
  var $scope;
  var foodData;

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
  });
  // describe('Food controller functions', function() {
  //   beforeEach(angular.mock.inject(function(_foodData_) {
  //     foodData = _foodData_;
  //     this.foodController = $ControllerConstructor('foodController', {$scope: $scope});
  //   }));

  //   describe('Saving Single Food function', function() {

  //     it('Should store a single food on foodData.singleFood', function() {
  //       console.log($scope.saveSingleFood);
  //     });
});
