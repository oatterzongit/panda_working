(function() {
  'use strict';

  angular
    .module('app')
    .factory('tokenService', tokenService)

    tokenService.$inject = ['$log', '$window'];

    function tokenService($log, $window) {

      const TOKEN_KEY = 'key';
      var service = {
        get:     get,
        save:    save,
        decode:  decode,
        destroy: destroy
      };


      // Methods
      function save(token) {
        $window.localStorage.setItem(TOKEN_KEY, token);
      }

      function get() {
        return $window.localStorage.getItem(TOKEN_KEY);
      }

      function decode() {
        var token = get();
        if (token) {
          return $window.jwt_decode(token);
        } else {
          return null;
        }
      }

      function destroy() {
        $window.localStorage.removeItem(TOKEN_KEY);
      }



      return service;
    };
})();
