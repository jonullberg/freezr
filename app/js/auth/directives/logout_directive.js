'use strict';

module.exports = function (app) {
  app.directive('logoutDirective', ['$rootScope', function($rootScope) {
  return {
    restrict: 'AC',
    replace: false,
    scope: {},
    template: '<div data-ng-show="signedIn()"><button type="button"' +
    'data-ng-click="logout()" class="pure-button button-blue">logout</button></div>',
    controller: ['$scope', '$location', 'auth',
      function($scope, $location, auth) {
      $scope.signedIn = function() {
        return auth.isSignedIn();
        };
      $scope.logout = function () {
        auth.logout();
        $rootScope.loggedIn = false;
        $location.path('/sign_in');
        };
      }]
    };
  }]);
};
