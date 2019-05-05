const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilySchema = new Schema({
    name: String,
    email: String,
    message: String
});

module.exports = mongoose.model('Family', FamilySchema);