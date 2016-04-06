var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var commentSchema = new mongoose.Schema({
  author:            {
                       type: mongoose.Schema.Types.ObjectId,
                       ref:  "User"
                     },
  body:              { type: String,   required: true                  },
  createdAt:         { type: Date,     default:  Date.now              }
});

var postSchema = new mongoose.Schema({
  author:            {
                      type: mongoose.Schema.Types.ObjectId,
                      ref:  "User"
                     },
  comments:          [commentSchema],
  body:              { type: String,   required: true                  },
  current_location:  { type: String,   required: true                  },
  createdAt:         { type: Date,     default:  Date.now              }
});


postSchema.plugin(require('mongoose-bcrypt'));

postSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
