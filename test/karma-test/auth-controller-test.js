'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('players controllers', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('freezrApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    //don't have to use square bracket notation above for tests, because
    //won't ever be minified.
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;

  }));

  it('should be able to create a new controller', function() {
    var authController = $ControllerConstructor('authController',
      {$scope : $scope});
    expect(typeof authController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.authSubmit).toBe('function');
    //note that toBe (jasmine) differs slightly from to.be (mocha)
  });


});