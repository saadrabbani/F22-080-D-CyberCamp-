const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_path: {
    type: String,
    // required: true,
  },
});

module.exports = Videos = mongoose.model('Videos', videoSchema);