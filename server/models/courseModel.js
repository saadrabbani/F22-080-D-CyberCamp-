const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        // required: true
    },
    // Lectures is a array of links
    lectures: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: String,
        },
        // this should be array of ids of
        video: {
            type: String,
            required: true
        },
        // required: true
        // this should be array of ids of

    }],
    // readingMaterials is a array of files
    readingMaterials: {
        type: Array,
        // required: true,
        // type: String
    },
    // assignments is a array of files
    // assignments: {
    //     type: Array,
    //     required: true,
    //     // type: String
    // },
    // // quizzes is a array of links
    // quizzes: {
    //     type: Array,
    //     required: true,
    //     // type: String
    // },
    subscriberOnly: {
        type: Boolean,
        default: false
    },
    creatorName: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    pathId: {
        type: Schema.Types.ObjectId,
        ref: 'Path',
        required: true
    }
});

module.exports = Course = mongoose.model('Course', CourseSchema);
