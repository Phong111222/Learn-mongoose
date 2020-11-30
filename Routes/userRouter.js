const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const route = express.Router();

route.post('/register', async (req, res) => {
  const { name, password, email } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(password, salt);
  const user = new User({ name, password: hashPass, email });
  const rs = await user.save();
  res.json(rs);
});
route.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.FindUserByEmail(email);
  if (user) {
    const isMatch = await User.checkPass(password, user.password);
    if (isMatch) res.json({ msg: 'success' });
    else res.json({ msg: 'wrong password' });
  } else {
    res.json({ msg: 'Email not found' });
  }
});
module.exports = route;
