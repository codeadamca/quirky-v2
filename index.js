// **************************************************
// Require dotenv to import environment variables
require("dotenv").config();

// **************************************************
// Load models
const Site = require("./models/site.model.js");
const siteRoute = require("./routes/site.route.js");

// **************************************************
// Require express for routing
const express = require("express");
const app = express();
const path = require('path');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/sites", siteRoute);

app.use(express.static(path.join(__dirname, 'public')));

// **************************************************
// Require reload for auto development updates
const reload = require('reload');

// **************************************************
// Connect to MongoDB database using Mongoose
const mongoose = require("mongoose");

mongoose.set("debug", true);

const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + 
    ":" + process.env.MONGODB_PASSWORD + 
    "@" + process.env.MONGODB_CLUSTER + 
    ".yx8at.mongodb.net/" + process.env.MONGODB_DATABASE + 
    "?retryWrites=true&w=majority&appName=" + process.env.MONGODB_APP;

mongoose.connect(uri)
.then(() => {
    console.log(`MongoDB Connected: {conn.connection.host}`);
})
.catch((error) => {
    console.error(error.message);
    process.exit(1);
});

// **************************************************
// Initializse app
app.listen(process.env.PORT, () => {

    console.log("Server is running on port " + process.env.PORT);

});

// **************************************************
// Add routes
app.get("/", (req, res) => {

    res.render('index', {
        title: 'Home Page',
      });

});


reload(app);
