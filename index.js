// **************************************************
// Require dotenv to import environment variables
require("dotenv").config();

// **************************************************
// Load models
const Site = require("./models/site.model.js");
const apiRoutes = require("./routes/api.routes.js");
const webRoutes = require("./routes/web.routes.js");

// **************************************************
// Require express for routing
const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');

// **************************************************
// Initialize session
app.use(
    session({
      secret: 'dh^R42*&^G',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

// **************************************************
// Set a local variable storing logged in status
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

// **************************************************
// Set PUG as template engine
app.set('view engine', 'pug');
app.set('view cache', false); 

// **************************************************
// Set some default middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// **************************************************
// Set routes
app.use("/api", apiRoutes);
app.use('/', webRoutes);

// **************************************************
// Set the public path as a static folder
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
const server = app.listen(process.env.PORT, () => {

    console.log("Server is running on port " + process.env.PORT);

});

reload(app);