const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  name: String,
  email: String,
  level:String,
  message: String
});

module.exports = mongoose.model('Interest', interestSchema);
