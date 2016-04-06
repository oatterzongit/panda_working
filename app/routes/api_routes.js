var express = require('express'),
    router  = new express.Router();

// Require controllers
var usersController = require('../controllers/users');
var postsController = require('../controllers/posts');

// Require Token Authentication
var token           = require('../config/token_auth');


// User Resource Paths
router.get('/users',              usersController.index);
router.get('/users',              usersController.create);
router.get('/users/:id',          usersController.show);
router.get('/users/me',           usersController.me);

// Posts Resource Paths
router.get('/posts',              postsController.index);
router.get('/posts',              postsController.create);
router.get('/posts/:id',          postsController.show);

// Comments Resource Paths
router.get('/posts/:id/comments', postsController.listComments);

// Token Resource Paths
router.get('/token',              token.create);
router.get('/users/me/token',     token.authenticate);
router.get('/users/me/token',     token.refresh);



module.exports = router;
