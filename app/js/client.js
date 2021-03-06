'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var freezrApp = angular.module('freezrApp', ['ngRoute', 'ngCookies', 'base64']);

//  services
require('./services/copy')(freezrApp);
require('./services/rest_resources')(freezrApp);
require('./auth/services/auth_service')(freezrApp);
require('./services/food_data')(freezrApp);

//  controllers
require('./auth/controllers/auth_controller')(freezrApp);
require('./food_inventory/controllers/food_controller')(freezrApp);
require('./single_food/controllers/single_food_controller')(freezrApp);

//  directives
require('./directives/header_directive')(freezrApp);
require('./directives/footer_directive')(freezrApp);
require('./auth/directives/logout_directive')(freezrApp);
require('./auth/directives/sign_in_directive')(freezrApp);
require('./auth/directives/create_user_directive')(freezrApp);
require('./food_inventory/directives/inventory_form_directive')(freezrApp);
require('./auth/directives/display_user_directive')(freezrApp);
require('./recipes/directives/recipe_directive')(freezrApp);

//  values

freezrApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
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
      controller: 'singleFoodController'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
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
