var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');

// Load local libraries.
var env      = require('./config/environment'),
    mongoose = require('./config/database'),
    routes   = require('./routes/api_routes');

// Instantiate a server application.
var app = express();

// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');



/*== MIDDLEWARE ==*/

// Allow CORS
if (app.get('env') === 'development') {
  app.use(allowCors);
}

// Logging layer.
app.use(logger('dev'));

// Parser and debug
app.use(bodyParser.json());
app.use(debugReq);

// Routes to static assets. Uncomment below if you have a favicon.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Defines all of our "dynamic" routes.
app.use('/api', routes);

// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling layer.
app.use(addFailedAuthHeader);
app.use(function(err, req, res, next) {
  var message = err.message,
      status  = err.status || 500;

  res.status(status);

  if (app.get('env') === 'development' && status === 500) {
    res.json({
      message: message,
      error: err
    });
  } else {
    res.json(message);
  }
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

function allowCors(req, res, next) {
  res.header('Access-Controller-Allow-Origin', '*');
  res.header('Access-Controller-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Controller-Allow-Headers', 'Content-Type,Authorization');

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
}

module.exports = app;
