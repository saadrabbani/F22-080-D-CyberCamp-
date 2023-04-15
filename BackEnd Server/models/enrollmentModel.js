const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EnrollmentSchema = new Schema({
    userId: {
        type: String,
        required: true
      },
      courseId: {
        type: String,
        required: true
      },
      progress: {
        type: Number,
        default: 0
      }
});

module.exports = Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

