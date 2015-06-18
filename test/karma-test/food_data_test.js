'use strict';

require('../../app/js/client');

require('angular-mocks');

describe('Food Data Service', function() {

  var foodData;

  beforeEach(angular.mock.module('freezrApp'));

  beforeEach(angular.mock.inject(function(_foodData_) {
    foodData = _foodData_;
  }));

  it('Should be able to create a new service', function() {
    expect(typeof foodData).toBe('object');
    expect(Array.isArray(foodData.store)).toBe(true);
    expect(typeof foodData.storeData).toBe('function');
    expect(foodData.store.length).toBe(0);
  });

  describe('The storeData function', function() {
    var fakeData = [
      {
        name: 'test number 1'
      },
      {
        name: 'test number 2'
      }
    ];
    beforeEach(function() {
      foodData.storeData(fakeData);
    });
    it('should store data in store', function() {
      expect(foodData.store.length).toBe(2);
    });
  });
});
