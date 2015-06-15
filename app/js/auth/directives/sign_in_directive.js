'use strict';

module.exports = function(app) {
  app.directive('signInDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/sign_in.html',
      scope: {

      },
      transclude: true
    };
  });
};
