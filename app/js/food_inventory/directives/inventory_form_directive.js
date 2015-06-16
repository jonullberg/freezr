'use strict';

module.exports = function(app) {
  app.directive('inventoryFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/inventory_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        item: '='
      },
      transclude: true
    };
  });

  //TODO: inventoryEditFormDirective
};
