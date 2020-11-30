const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: {
    required: [true, 'name is required'],
    type: String,
  },
  password: {
    required: [true, 'password is required'],
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
      message: 'invalid email',
    },
  },
});
UserSchema.static('FindUserByEmail', function (email) {
  return this.findOne({ email });
});

UserSchema.static('checkPass', async function (pass, hashPass) {
  const isMath = bcrypt.compare(pass, hashPass);
  return isMath;
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
