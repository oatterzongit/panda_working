var express = require('express'),
    router  = new express.Router();

// Require controllers
var usersController = require('../controllers/users');
var postsController = require('../controllers/posts');


// Require Token Authentication
var token = require('../config/token_auth');

// User Resource Paths
router.get('/users',              usersController.index);
router.post('/users',             usersController.create);
router.get('/users/:id',          usersController.show);
router.get('/users/me',           token.authenticate, usersController.me);

router.post('/token',             token.create);
router.post('/users/me/token',    token.authenticate, token.refresh);

// Posts Resource Paths
router.get('/posts',              postsController.index);
router.post('/posts',             token.authenticate, postsController.create);
router.get('/posts/:id',          postsController.show);

// Comments Resource Paths
router.get('/posts/:id/comments', token.authenticate, postsController.listComments);




module.exports = router;
