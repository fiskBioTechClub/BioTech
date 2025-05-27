// import the npm packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
// const multer = require ("multer");

require('dotenv').config();


const eventsRoute = require('./routes/events');
const uploadRoute = require('./routes/upload');
const teamsRoute = require('./routes/teams');
const projectsRoute = require('./routes/projects');
const opportunitiesRoute = require('./routes/opportunities');


// instance of express app
const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/events', eventsRoute);
app.use('/upload', uploadRoute);
app.use('/teams', teamsRoute);
app.use('/projects', projectsRoute);
app.use('/opportunities', opportunitiesRoute);



// connection string of mongodb
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, 
    /* { useNewUrlParser:true, useUnifiedTopology: true, }*/
    ).then(() => console.log('Connected Sucessfully')).catch(err => console.error('MongoDB connection error:', err))

//routes

app.get('/', (req,res) => {
    res.send('Fisk BioTech API is running');
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});