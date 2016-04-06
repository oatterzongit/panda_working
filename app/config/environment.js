var _ = require('lodash');

var localEnvVars = {
  TITLE:      'panda_working/',
  SAFE_TITLE: 'panda_working/'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
