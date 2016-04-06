(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

    LoginController.$inject = ['$log', 'authService', '$state'];

    function LoginController($log, auth, $state) {
      var vm = this;

      // Bindings
      vm.login = login;



      // Methods
      function login() {
        auth.login(vm.email, vm.password)
          .then(function() {
            $state.go('dashboard');
          })
          .catch(function(err) {
            $log.info(err);
          })

      }





    };

})();
