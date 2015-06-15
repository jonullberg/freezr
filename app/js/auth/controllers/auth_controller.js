'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    if (auth.isSignedIn()) $location.path('/landing_page');

    $scope.errors = [];

    $scope.authSubmit = function(user) {
      if(user.password_conf) {
        if(user.password !== user.password_conf) {

          window.alert('Your password and confirmation do not match');
          return;
        }
        auth.create(user, function(err) {
          if(err)  {
            console.log(err);
            return $scope.errors.push({ msg: 'Could not sign in' });
          }

          $location.path('/landing_page');
        });
      } else {
      auth.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({ msg: 'Could not sign in' });
          }

          $location.path('/landing_page');
        });
      }
    };
  }]);
};
