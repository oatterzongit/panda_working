(function() {
  'use strict';

  angular
    .module('app', ['ui.router', 'ngMaterial', 'ngAnimate'])
    .factory('tokenInterceptor', tokenInterceptor)
    .config(['$mdThemingProvider', '$httpProvider',

    function($mdThemingProvider, $httpProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('red', {
          'default': '500',
          'hue-1':   '100',
          'hue-2':   '600',
          'hue-3':   'A100'
        })
        .accentPalette('grey', {
          'default': '200'
        });
      }]);

      tokenInterceptor.$inject = ['tokenService', '$state'];

      function tokenInterceptor(tokenService, $state) {
        return {
          request: function(config) {
            var token = tokenService.retrieve();
            if (token) {
              config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
          },
          responseError: function(res) {
            if (res.status === 403) { $state.go('login') };
          }
        };
      }
})();
