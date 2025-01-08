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

app.use(
    session({
      secret: '1234567890',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", apiRoutes);
app.use('/', webRoutes);

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

reload(app);
