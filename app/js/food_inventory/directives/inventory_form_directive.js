'use strict';

module.exports = function(app) {
  app.directive('inventoryFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/inventory_form.html',
      scope: {},
      transclude: true
    };
  });

  app.directive('singleItemEditDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/single_item_edit_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        item: '='
      },
      transclude: true
    };
  });
};
