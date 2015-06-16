'use strict';

module.exports = function(app) {
  app.directive('createdByDirective', ['$rootScope', function($rootScope) {
    return {
      restric: 'AC',
      replace: true,
      scope: {},
      template: '<div data-ng-show="signedIn()"><span>Created By: {{user.username}}</span></div>',
      controller: ['$scope', 'auth', function($scope, auth) {
        $scope.signedIn = function() {
          return console.log(auth.whoami());
        };
      }]
    };
  }]);
};
