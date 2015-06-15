'use strict';

module.exports = function (app) {
  app.directive('logoutDirective', function() {
  return {
    restrict: 'AC',
    replace: true,
    scope: {},
    template: '<div data-ng-show="signedIn()"><button type="button"' +
    'data-ng-click="logout()">Log Out</button></div>',
    controller: ['$scope', '$location', 'auth',
      function($scope, $location, auth) {
      $scope.signedIn = function() {
        return auth.isSignedIn();
        };
      $scope.logout = function () {
        auth.logout();
        $location.path('/sign_in');
        };
      }]
    };
  });
};