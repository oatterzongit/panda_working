(function() {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService)

    authService.$inject = ['$log', '$http'];

    function authService($log, $http) {
      var service = {
        login: login
      };

      // Bindings


      // Methods
      function login(email, password) {
        // make $http POST to token api route
      }



      return service;

    };

})();
