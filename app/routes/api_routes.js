var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var postsController = require('../controllers/posts');

// Token goes here


// User Resource Paths
router.get('/users',              usersController.index);
router.get('/users',              usersController.create);
router.get('/users/:id',          usersController.show);

// Posts Resource Paths
router.get('/posts',              postsController.index);
router.get('/posts',              postsController.create);
router.get('/posts/:id',          postsController.show);

// Comments Resource Paths
router.get('/posts/:id/comments', postsController.listComments);


module.exports = router;
