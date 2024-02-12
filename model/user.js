const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: Number,
    },
    otpGeneratedAt: {
        type: Date,
    },
    name: {
        type: String
    },
    dob: {
        type: Date
    },
    history: {
        type: Array
    },
    gender: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
