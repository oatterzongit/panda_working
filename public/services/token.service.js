(function() {
  'use strict';

  angular
    .module('app')
    .factory('tokenService', tokenService)

    tokenService.$inject = ['$log', '$window'];

    function tokenService($log, $window) {
      var service = {
        retrieve: retrieve
      };

      // Bindings


      // Methods
      function retrieve() {
        
      }



      return service;

    };

})();
