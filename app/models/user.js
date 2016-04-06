var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  display_name:     { type: String,  required: true, unique: true },
  email:            { type: String,  required: true, unique: true },
  first_name:       { type: String,  required: true               },
  last_name:        { type: String,  required: true               },
  location:         { type: String,  required: true               },
  acknowledgements: { type: Number,  default:  0                  },
  admin:            { type: Boolean, default:  false              },
  createdAt:        { type: Date,    default:  Date.now           }
});

userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
