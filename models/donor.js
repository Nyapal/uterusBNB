const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonorSchema = new Schema({
    fname: String,
    lname: String,
    age: String,
    height: String,
    eyes: String,
    hair: String,
    race: String,
    ethnicity: String,
    status: { type: Boolean, default: 0 }
});

module.exports = mongoose.model('Donor', DonorSchema);