'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    /**
     * An array attached to scope that creates tabbable interface with two properties.
     * @title {string}
     * @type {Array}
     */
    $scope.tabs = [{
      title: 'Create User',
      url: '../templates/directives/create_user.html'
    }, {
      title: 'Sign In',
      url: '../templates/directives/sign_in.html'
    }];

    $scope.currentTab = '../templates/directives/sign_in.html';

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl === $scope.currentTab;
    };

    if(auth.isSignedIn()) $location.path('/homepage');

    if (!auth.isSignedIn()) $location.path('/sign_in');

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
          $location.path('/homepage');
        });
      } else {
        auth.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({ msg: 'Could not sign in' });
          }
          $location.path('/homepage');
        });
      }
    };
  }]);
};
