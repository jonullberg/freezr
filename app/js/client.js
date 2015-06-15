'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var freezrApp = angular.module('freezrApp', ['ngRoute', 'ngCookies', 'base64']);

//  services


//  controllers
require('./auth/controllers/auth_controllers')(freezrApp);

//  directives


freezrApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/sign_in', {
      templateUrl: 'templates/views/sign_in.html',
      controller: 'authController'
    })
    .when('/create_user', {
      templateUrl: 'templates/views/create_user.html',
      controller: 'authController'
    })
    .when('/', {
      redirectTo: '/create_user' // Where should we land?
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}]);
