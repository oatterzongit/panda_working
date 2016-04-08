(function() {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService)

    authService.$inject = ['$log', '$http', 'tokenService'];

    function authService($log, $http, token) {
      var service = {
        logIn:        logIn,
        isLoggedIn:   isLoggedIn,
        logOut:       logOut,
        currentUser:  currentUser,
        refreshToken: refreshToken,
        createUser:   createUser,
        updateUser:   updateUser
      };


      function logIn(data) {
        var promise = $http({
          method: 'POST',
          url:    '/api/token',
          data:   data,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function(res) {
          token.save(res.data.token);
          return token.decode();
        });
        return promise;
      }

      function isLoggedIn() {
        return (token.get() != null);
      }

      function logOut() {
        token.destroy();
        $log.debug('Logged Out')
      }

      function currentUser() {
        var tokenData = token.decode();
        if(tokenData) {
          tokenData.expiresAt = Date(tokenData.exp);
          delete tokenData.exp;
          delete tokenData.iat;
        }
        return tokenData;
      }

      function refreshToken() {
        var promise = $http({
          method: 'POST',
          url:    '/api/users/me/token'
        })
        .then(function(res) {
          token.save(res.data.token);
          return token.decode();
        });
        return promise;
      }

      function createUser(data) {
        var promise = $http({
          method: 'POST',
          url:    '/api/users',
          data:   data
        });
        $log.debug(data);
        return promise;
      }

      function updateUser(data) {
        var promise = $http({
          method: 'PUT',
          url:    '/api/users/me',
          data:   data
        });
      }

      return service;
    };
})();
