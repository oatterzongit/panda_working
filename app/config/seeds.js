var mongoose = require('./database');

var User = require('../models/user');

var users = [
  {
    "first_name": "oat",
    "last_name": "asdon",
    "display_name": "oatasdon",
    "email": "oat@oat.com",
    "location": "city walk",
    "admin": true,
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.connection.close(function(err) {
        if (err) console.log(err);
        process.exit(0);
      });
    }
  });
});
