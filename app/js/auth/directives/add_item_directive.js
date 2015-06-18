'use strict';

module.exports = function (app) {
  app.directive('addItemDirective', ['$rootScope', function($rootScope) {
  return {
    restrict: 'AC',
    replace: false,
    scope: {},
    template:
      '<div data-ng-show="??"><div id="add-button" data-ng-click="??"</div></div>',
    controller: ['$scope', '$location', 'auth',
      function($scope, $location) {
      $scope.signedIn = function() {
        return;
        };
      $scope.logout = function () {
        $rootScope.loggedIn = false;
        $location.path('/sign_in');
        };
      }]
    };
  }]);
};
