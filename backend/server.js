// import the npm packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require ("multer");

require('dotenv').config();

// instance of express app
const app = express();
const port = process.env.PORT || 5050;
const eventsRoute = require('./routes/events');


app.use(cors());
app.use(express.json());

app.use('/events', eventsRoute);

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