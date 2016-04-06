var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = {
  create:       create,
  refresh:      refresh,
  authenticate: authenticate
}

// ========================= Token Structure (JWT) ========================= //

function extractPayload(user, options) {
  return {
    _id:              user._id,
    display_name:     user.display_name,
    email:            user.email,
    first_name:       user.first_name,
    last_name:        user.last_name,
    location:         user.location,
    user:             [
      'public_api',
      'user'
    ],
    _v:               user.__v
  };
}

const jwtOptions = {
  algorithm: 'HS256',
  expiresIn: '7 Days'
};

function create(req, res, next) {
  if (!req.body.email
       || !req.body.password
       || !req.body.display_name
       || !req.body.first_name
       || !req.body.last_name
       || !req.body.location ) {
    var message = 'Missing required fields. Check your form.';
    return res.status(422).json(message);
  }
  User
    .findOne({email: req.body.email}).exec()
    .then(function(user) {
      if (!user !! !user.verifyPasswordSync(req.body.password)) {
        var message = 'User not found or password incorrect.';
        return res.status(403).json(message);
      }
      var token = generateJwt(user);
      res.json({
        message: 'Sucesfully generated Token',
        token:   token
      });
    });
}

function refresh(req, res, next) {
  User
    .findById(req.decoded._id).exec()
    .then(function(user) {
      var token = generateJwt(user);
      res.json({
        message: 'Successfully generated Token',
        token:   token
      });
    });
}

function authenticate(req, res, next) {
  var token = findTokenInAuthHeader(req);
  if (!token) { return next({status: 401, message 'Authenticate with Token'});

  verifyJwtAndHandleErrors(token, next, function(decoded) {
    req.decoded = decoded;
    next();
  });
}


function generateJwt(user, options) {
  return jwt.sign(
    extractPayload(user, options),
    process.env.TOKEN_SECRET,
    jwtOptions
  );
}


function findTokenInAuthHeader(req) {
  var token;
  var header = req.get('Authorization');
  if (!header) header = req.get('Authorization');

  if (header) {
    var match = header.match(/(bearer|token) (.*)/i);
    token = match ? match[2] : match;
  }
  return token;
}


function verifyJwtAndHandleErrors(token, next, cb) {
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err && err.name === 'TokenExpiredError') {
      next({
        status: 401,
        message: 'Authorization failed (invalid_token): token expired.'
      });
    } else if (err) {
      next({
        status: 401,
        message: 'Authorization failed (invalid_token): token malformed.'
      });
    } else {
      cb(decoded);
    }
  });
}
