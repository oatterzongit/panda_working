(function() {
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

    appRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

    function appRoutes($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('home', {
          url:          '/',
          templateUrl:  '/js/app/templates/home.html'
        })
        .state('login', {
          url:          '/login',
          templateUrl:  '/js/app/templates/login.html',
          controller:   'NavbarController',
          controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/');

    }
})();
