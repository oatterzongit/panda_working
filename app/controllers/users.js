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


function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing Required Fields.');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Success: User Created.',
        data:    {
          id:           user._id,
          display_name: user.display_name,
          email:        user.email,
          first_name:   user.first_name,
          last_name:    user.last_name,
          location:     user.location,
          admin:        user.admin
        }
      });
    }).catch(function(err) {
      if (err.message.match(/E1100/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
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
