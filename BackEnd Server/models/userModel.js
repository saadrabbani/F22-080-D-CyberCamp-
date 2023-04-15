const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    userType: {
        type: String,
        required: true
    },
    subscriber: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ''
    }
});

module.exports = User = mongoose.model('users', UserSchema);
