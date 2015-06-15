'use strict';

module.exports = function(app) {
  app.directive('createUserDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/create_user.html',
      scope: {

      },
      transclude: true
    };
  });
};
