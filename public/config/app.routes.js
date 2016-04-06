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
          templateUrl:  '/layouts/home.html'
        })
        .state('login', {
          url:          '/login',
          templateUrl:  '/layouts/login.html',
          controller:   'LoginController',
          controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/');

    }
})();
