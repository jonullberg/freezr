'use strict';

module.exports = function(app) {
  app.directive('headerDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/header.html',
      scope: {

      },
      transclude: true
    };
  });
};
