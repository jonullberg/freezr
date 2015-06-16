'use strict';

module.exports = function(app) {

  /**
   * a function that is called when a REST request is unsuccessful, receiving a callback as an argument that is instantiated on the error data
   * @param  {Function} callback
   * @return {function}
   */

  var handleError = function(callback) {
    return function(data) {
      console.log(data);
      callback(data);
    };
  };

  /**
   * A function that is called when a REST request is successfully made, getting a callback argument to call on the data processed.
   * @param  {Function} callback A callback to deal with data on a successful REST request
   * @return {function}
   */

  var handleSuccess = function(callback) {
    return function(data) {
      callback(null, data);
    };
  };

  /**
   * An instantiation of the RESTResource service recieving the built in Angular http dependency and cookies dependency
   */

  app.factory('RESTResource', ['$http', '$cookies', function($http, $cookies) {

    /**
     *
     */

    return function(resourceName) {
      var token = $cookies.get('token');

      /**
       *
       */
      $http.defaults.headers.common.token = token;
      return {

        /**
         * A getAll() method for this service that performs an HTTP GET request for the given resource and uses a promise to handle success and error
         */

        getAll: function(callback) {
          $http.get('/api/' + resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        /**
         * A create() method for this service that performs an HTTP POST request for the given resource and uses a promise to handle success and error
         */

        create: function(resourceData, callback) {
          $http.post('/api/' + resourceName, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(resourceData, callback) {
          $http.put('/api/' + resourceName + '/' + resourceData._id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },


        remove: function(resourceData, callback) {
          $http.delete('/api/' + resourceName + '/' + resourceData._id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
