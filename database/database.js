const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/tutorial', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
