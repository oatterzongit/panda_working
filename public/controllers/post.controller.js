(function() {
  'use strict';

  angular
    .module('app')
    .controller('postController', postController)

    postController.$inject = ['$log', '$http', 'authService'];

    function postController($log, $http, authService) {
      var vm = this;

      vm.allPosts   = allPosts;
      vm.showPost   = showPost;
      vm.createPost = createPost;
      vm.showUser   = showUser;
      vm.allUsers   = allUsers;

      vm.posts = [];

      vm.post = '';

      vm.newPost = {
        author: '',
        body:   ''
      }

      vm.users = {
        _id: '',
        email: '',
        acknowledgements: '',
        admin: '',
        createdAt: ''
      }

      vm.allPosts();
      vm.allUsers();

      function allPosts() {
        $http.get('/api/posts')
          .then(function(res) {

            vm.posts = res.data;
          }, function(err) {
            $log.debug('allPosts Error: ', err);
          });
      }

      function showPost(id) {
        $http.get('/api/posts/' + id)
          .then(function(res) {
            vm.post = res.data;
          }, function(err) {
            $log.debug('showPost Error: ', err);
          });
      }

      function showUser(id) {
        $http.get('/api/users/' + id)
          .then(function(res) {
            vm.user = res.data;
          }, function(err) {
            $log.debug('showPost Error: ', err);
          });
      }

      function allUsers() {
        $http.get('/api/users')
          .then(function(res) {
            vm.users = res.data;
          }, function(err) {
            $log.debug('allPosts Error: ', err);
          });
      }

      function createPost() {
        $http.post('/api/posts', vm.newPost)
          .then(getFishes)
          .then(function(res) {
            vm.newPost = {
              author: '',
              body:   ''
            };
          });
      }




      $log.debug('postController loaded');
    };
})();
