var User = require("../models/user");

module.exports = {
  index:  index,
  show:   show,
  create: create,
  me:     me
};


function index(req, res, next){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(users);
    }
  });
};

function show(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.json(user);
    }
  });
};

function create(req, res) {
  var user = new User();

  user.first_name   = req.body.first_name;
  user.last_name    = req.body.last_name;
  user.display_name = req.body.display_name;
  user.email        = req.body.email;
  user.location     = req.body.location;

  user.save(function(err, savedUser) {
    if (err) { res.send(err) }
    res.json(savedUser);
  });
};

function me(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'User Data Retrieved.',
        data:    user
      });
    })
    .catch(function(err) {
      next(err);
    });
};
