var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');

// Token goes here


// User Resource Paths
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

module.exports = router;
