var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var postSchema = new mongoose.Schema({
  author:         { type: String,  required: true },
  body:           { type: String,  required: true },
  display_name:   { type: String,  required: true, unique: true },
  location:       { type: String,  required: true },
  createdAt:      { type: Date,    default:  Date.now },
});

postSchema.plugin(require('mongoose-bcrypt'));

postSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('Post', postSchema);

module.exports = Post;
