'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var freezrApp = angular.module('freezrApp', ['ngRoute', 'ngCookies', 'base64']);

//  services
require('./services/rest_resources')(freezrApp);
require('./auth/services/auth_service')(freezrApp);
require('./services/food_data')(freezrApp);

//  controllers
require('./auth/controllers/auth_controller')(freezrApp);
require('./food_inventory/controllers/food_controller')(freezrApp);

//  directives
require('./directives/header_directive')(freezrApp);
require('./directives/footer_directive')(freezrApp);
require('./auth/directives/logout_directive')(freezrApp);
require('./auth/directives/sign_in_directive')(freezrApp);
require('./auth/directives/create_user_directive')(freezrApp);
require('./food_inventory/directives/inventory_form_directive')(freezrApp);


freezrApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/sign_in', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authController'
    })
    .when('/create_user', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authController'
    })
    .when('/homepage', {
      templateUrl: 'templates/views/homepage.html',
      controller: 'foodController'
    })
    .when('/item', {
      templateUrl: 'templates/views/single_food.html',
      controller: 'foodController'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}])
.run( function($rootScope, $location, foodData, auth) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if(!auth.isSignedIn()) {
      if(next.$$route.templateUrl !== 'templates/views/auth.html') {
        $location.path('/sign_in');
      }
    }
  });
});
