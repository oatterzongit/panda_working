(function() {
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

    appRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

    function appRoutes($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('welcome', {
          url:          '/',
          templateUrl:  '/layouts/welcome.html'
        })
        .state('home', {
          url:          '/home',
          templateUrl:  '/layouts/home.html',
          controller:   'HomeController',
          controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/');

    }
})();
