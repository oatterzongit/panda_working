(function() {
  'use strict';

  angular
    .module('app', ['ui.router', 'ngMaterial'])
    .config(function($mdThemingProvider) {
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
      });
})();
