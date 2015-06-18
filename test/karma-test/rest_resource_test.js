'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('REST Resource Service', function() {

  var RESTResource;
  var resource;
  var $httpBackend;
  var testData = {
    _id: 'myId',
    name: 'testing'
  };
  var testFailResponse = function(method, url, data, headers) {
    return [404, '404 Error', {}, '404 error']
  };

  beforeEach(angular.mock.module('freezrApp'));

  beforeEach(angular.mock.inject(function(_RESTResource_) {
    RESTResource = _RESTResource_;

  }));

  it('Should create a new service', function() {
    expect(typeof RESTResource).toBe('function');
  });

  describe('An instantiation of a REST service', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      resource = RESTResource('testResource');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should create an instantiation of the service', function() {

      expect(typeof resource).toBe('object');
      expect(typeof resource.getAll).toBe('function');
      expect(typeof resource.create).toBe('function');
      expect(typeof resource.save).toBe('function');
      expect(typeof resource.remove).toBe('function');

    });

    describe('The getAll function', function() {
      it('Should make a GET request', function() {
        $httpBackend.expectGET('/api/testResource').respond(200, testData);
        resource.getAll(function(err, data) {
          expect(err).toBe(null);
          expect(typeof data).toBe('object');
          expect(data.name).toBe('testing');
        });
        $httpBackend.flush();
      });
      it('Should fail to make a GET request to the wrong url', function() {
        $httpBackend.expectGET('/api/testResource').respond(testFailResponse);
        resource.getAll(function(err, data) {
          expect(err).toBe('404 Error');
          expect(data).toBe(undefined);
        });
        $httpBackend.flush();
      });
    });
    describe('The create function', function() {
      it('Should make a POST request', function() {
        $httpBackend.expectPOST('/api/testResource').respond(200, testData);
        resource.create(testData, function(err, data) {
          expect(err).toBe(null);
          expect(data.name).toBe('testing');
        });
        $httpBackend.flush();
      });
      it('Should fail to make a POST request', function() {
        $httpBackend.expectPOST('/api/testResource').respond(testFailResponse);
        resource.create(testData, function(err, data) {
          expect(data).toBe(undefined);
          expect(err).toBe('404 Error')
        });
        $httpBackend.flush();
      });

    });
    describe('The remove function', function() {
      it('Should make a DELETE request', function() {
        $httpBackend.expectDELETE('/api/testResource/myId').respond(200, testData);
        resource.remove(testData, function(err, data) {
          expect(err).toBe(null);
          expect(data.name).toBe('testing');
        });
        $httpBackend.flush();
      });
      it('Should fail to make a DELETE request', function() {
        $httpBackend.expectDELETE('/api/testResource/myId').respond(testFailResponse);
        resource.remove(testData, function(err, data) {
          expect(data).toBe(undefined);
          expect(err).toBe('404 Error')
        });
        $httpBackend.flush();
      });
    });
    describe('The save function', function() {
      it('Should make a PUT request', function() {
        $httpBackend.expectPUT('/api/testResource/myId').respond(200, testData);
        resource.save(testData, function(err, data) {
          expect(err).toBe(null);
          expect(data.name).toBe('testing');
        });
        $httpBackend.flush();
      });
      it('Should fail to make a PUT request', function() {
        $httpBackend.expectPUT('/api/testResource/myId').respond(testFailResponse);
        resource.save(testData, function(err, data) {
          expect(data).toBe(undefined);
          expect(err).toBe('404 Error')
        });
        $httpBackend.flush();
      });
    });

  });
});
