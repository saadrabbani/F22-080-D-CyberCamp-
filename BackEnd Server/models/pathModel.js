const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PathSchema = new Schema({
    pathName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = Path = mongoose.model('Path', PathSchema);