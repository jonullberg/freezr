'use strict';

require('../../app/js/client');

require('angular-mocks');

describe('Authentication service', function() {
  var auth;
  var $httpBackend;
  var $cookies;
  var fakeUser;
  var fakeResponse;
  var fakeCallback = function(err, data) {
    if(err) return console.log(err);
  };

  beforeEach(angular.mock.module('freezrApp'));

  beforeEach(angular.mock.inject(function(_auth_) {
    auth = _auth_;
  }));

  it('Should create a new service', function() {
    expect(typeof auth).toBe('object');
    expect(typeof auth.signIn).toBe('function');
    expect(typeof auth.create).toBe('function');
    expect(typeof auth.logout).toBe('function');
    expect(typeof auth.isSignedIn).toBe('function');
  });

  describe('Auth services', function() {
    beforeEach(angular.mock.inject(function(_$cookies_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $cookies = _$cookies_;
      fakeUser = {
        email: 'fakeUser@example.com',
        password: 'foobar123',
        username: 'fakeUsername'

      };
      fakeResponse = {
        token: 'myToken',
        username: 'fakeUsername'
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    afterEach(function() {
      auth.logout();
    });

    describe('The signIn function', function() {

      it('Should make a GET request', function() {
        $httpBackend.expectGET('/api/sign_in').respond(200, fakeResponse);
        auth.signIn(fakeUser, fakeCallback);
        $httpBackend.flush();
        expect($cookies.get('username')).toBe('fakeUsername');
        expect($cookies.get('token')).toBe('myToken');
      });
    });

    describe('The create function', function() {

      it('Should make a POST request and save cookies', function() {
        $httpBackend.expectPOST('/api/create_user').respond(200, fakeResponse);
        auth.create(fakeUser, fakeCallback);
        $httpBackend.flush();
        expect($cookies.get('username')).toBe('fakeUsername');
        expect($cookies.get('token')).toBe('myToken');
      });


    });

    describe('The logout function', function() {
      it('Should set cookie token to empty string', function() {
        auth.logout();
        expect($cookies.get('token')).toBe('');
      });
    });

    describe('The isSignedIn function', function() {
      it('Should return true when token exists and token has a length', function() {
        $cookies.put('token', 'fakeToken');
        expect(auth.isSignedIn()).toBe(true);
      });

      it('Should return false when token does not exist', function() {
        console.log(auth.isSignedIn());
        expect(auth.isSignedIn()).toBe(false);
      });
    });
  });
});
