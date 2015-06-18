'use strict';

module.exports = function(app) {
  app.factory('foodData', function() {
    return {
      /**
       * Stores the food data array
       * @type {Array}
       */
      store: [],

      /**
       * Will hold the object being redirected to for global app functionality
       * @type {object}
       */
      singleFood: null,

      /**
       * Stores the food data that is passed into it and stores it in an array so data can be passed around the app
       * @param  {array} data Data that is pulled from the server to be used around the app
       */
      storeData: function(data) {
        console.log(data);
        this.store = data;
      }

    };
  });
};
