const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    position: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Team', teamSchema);