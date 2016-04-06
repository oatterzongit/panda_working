var Post = require("../models/post");

module.exports = {
  index:        index,
  show:         show,
  create:       create,
  listComments: listComments
};


function index(req, res, next){
  Post.find({}, function(err, posts) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(posts);
    }
  });
};

function show(req, res, next){
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.json({message: 'Could not find post because ' + err});
    } else if (!post) {
      res.json({message: 'No post with this id.'});
    } else {
      res.json(post);
    }
  });
};

function create(req, res) {
  var post = new Post();

  post.first_name   = req.body.first_name;
  post.last_name    = req.body.last_name;
  post.display_name = req.body.display_name;
  post.email        = req.body.email;
  post.location     = req.body.location;

  post.save(function(err, savedPost) {
    if (err) { res.send(err) }
    res.json(savedPost);
  });
};

function listComments(req, res, next){
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.json({message: 'Could not find post because ' + err});
    } else if (!post) {
      res.json({message: 'No post with this id.'});
    } else {
      res.json(post.comments);
    }
  });
};
