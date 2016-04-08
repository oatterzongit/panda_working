(function() {
  'use strict';

  angular
    .module('app')
    .controller('AuthController', AuthController)

    AuthController.$inject = ['$log', 'authService', '$state'];

    function AuthController($log, authService, $state) {
      var vm = this;

      // Bindings
      vm.submitLogIn  = submitLogIn;
      vm.submitSignUp = submitSignUp;
      vm.userLogOut   = userLogOut;
      vm.authService  = authService;

      vm.logIn = {
        email: '',
        password: ''
      };

      vm.signUp = {
        email: '',
        password: '',
        passwordConfirmation: ''
      };

      // Methods
      function submitLogIn() {
        authService
          .logIn(vm.logIn)
          .then(function(decodedToken) {
            $log.info('login success!', decodedToken);
            $state.go('home');
          }, function(err) {
            $log.debug(err);
          });
      }

      function submitSignUp() {
        authService
          .createUser(vm.signUp)
          .then(function(res) {
            $log.info('response: ', vm.signUp);
            return authService.logIn(vm.signUp);
          })
          .then(function(res) {
            $log.debug('Logged in.', res);
            $state.go('home');
          });
      }

      function userLogOut() {
        authService.logOut();
        $state.go('welcome');
      }

      $log.debug('AuthController Loaded');

    }

})();
