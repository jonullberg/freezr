'use strict';

module.exports = function(app) {
  app.directive('footerDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/footer.html',
      scope: {

      },
      transclude: true
    };
  });
};
