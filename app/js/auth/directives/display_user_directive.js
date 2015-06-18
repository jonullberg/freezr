'use strict';

module.exports = function (app) {
  app.directive('displayUserDirective', ['$rootScope', '$cookies', function($rootScope, $cookies) {
  return {
    restrict: 'AC',
    replace: false,
    scope: { },
    template: '<div data-ng-if="signedIn()"><p>Welcome,  {{displayUsername()}}</p></div>',
    controller: ['$scope', '$location', 'auth',
      function($scope, $location, auth) {
        $scope.signedIn = function() {
          return auth.isSignedIn();
        };

        // $scope.displayUsername = function() {
        //   var username = $cookies.get('username').toUpperCase();
        //   return username;
        // };
      }]
    };
  }]);
};
