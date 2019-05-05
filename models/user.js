const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // first: { type: String, required: true },
    // last: { type: String, required: true }
    // password: { type: String, select: false },
    // username: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    const now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now;
    }

    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })

})

UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    })
}

module.exports = mongoose.model('User', UserSchema);