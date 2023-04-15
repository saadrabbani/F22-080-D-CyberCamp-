const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  filename: String,
  contentType: String,
  uploadDate: Date,
  length: Number,
  chunkSize: Number,
});

module.exports = mongoose.model('File', fileSchema);
