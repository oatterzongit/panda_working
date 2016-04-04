(function() {
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

    appRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

    function appRoutes($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('intro', {
          url: '/',
          templateUrl: '/js/app/templates/intro.html'
        });

        $urlRouterProvider.otherwise('/');
    }
})();
