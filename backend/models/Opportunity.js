const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    name: String,
    link: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Opportunity', opportunitySchema);