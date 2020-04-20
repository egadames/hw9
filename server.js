s// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, "/db/db.json");
// uuid generates random ids
const uuid = require('uuid/v4');
const database = require("./db/db.json")

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});