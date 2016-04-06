var mongoose = require('./database');

var User = require('../models/user');
var Post = require('../models/post');

var users = [
  {
    "_id":             "57047d62d9a5cbe26ea89f22",
    "display_name":    "oatasdon",
    "email":           "oat@oat.com",
    "first_name":      "oat",
    "last_name":       "asdon",
    "location":        "General Assembly @ DTLA",
    "acknowledgements  ": 42,
    "admin":              true
  }
];

var posts = [
  {
    "author":            "57047d62d9a5cbe26ea89f22",
    "body":              "This is a seeded test post. Blah Blah Blah.",
    "current_location":  "General Assembly @ DTLA",
    "comments":
      [
        {
          "author":     "57047d62d9a5cbe26ea89f22",
          "body":       "This is a seeded test comment, embedded in the post model.",
          "createdAt":  "2016-04-06T03:07:14.883Z"
        },
        {
          "author":     "57047d62d9a5cbe26ea89f22",
          "body":       "New seeded comment. createdAt is defined at time of seed.",
        }
      ]

  }
];


User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      Post.remove({}, function(err) {
        if (err) console.log(err);
        Post.create(posts, function(err, posts) {
          if (err) {
            console.log(err);
          } else {
            console.log("Database seeded with " + posts.length  + " post.");
            mongoose.connection.close(function(err) {
              if (err) console.log(err);
              process.exit(0);
            });
          }
        });
      });
    }
  });
});
