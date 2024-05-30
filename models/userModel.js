const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// userSchema.plugin(plm);
userSchema.plugin(plm, { usernameField: 'username' });
const User = mongoose.model('User', userSchema);


module.exports = User;
