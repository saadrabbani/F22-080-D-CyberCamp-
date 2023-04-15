const express = require('express');
const app = express();

const mongoose = require('mongoose');
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/fyp_CC');
mongoose.connect('XXXX');
// mongodb://localhost:27017/

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const user_routes = require('./routes/userRoute');
const course_routes = require('./routes/courseRoute');
const path_routes = require('./routes/pathRoute');
const enrollment_route = require('./routes/enrollmentRoute');
const video_route = require('./routes/videoRoute');
const readingMaterial_route = require('./routes/readingMaterialRoute');

app.use('/api', user_routes);
app.use('/api', course_routes);
app.use('/api', path_routes);
app.use('/api', enrollment_route);
app.use('/api', video_route);
app.use('/api', readingMaterial_route);

app.listen(8000, () => console.log('Server started on port 8000'));