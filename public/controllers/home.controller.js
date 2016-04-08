(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController)

    HomeController.$inject = ['$log', 'authService', '$state'];

    function HomeController($log, authService, $state) {
      var vm = this;

      // Bindings


      // Methods




      $log.debug('HomeController Loaded.')

    };

})();
