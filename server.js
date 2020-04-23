// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, "/db/db.json");
var Generator = require('id-generator');
const database = require("./db/db.json");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// return all saved notes in database as JSON
app.get("/api/notes", function(req, res) {
  res.json(database);
});

app.post("/api/notes", function(req, res) {
  var g = new Generator();
  let newNote = req.body;
  newNote.id = g.newId();
  database.push(newNote);
  fs.writeFile(databasePath,JSON.stringify(database), () => {
    res.json(newNote);
  })
});

app.delete("/api/notes/:id", function(req, res) {
  let noteID = req.params.id;

  let newArray = database.filter( (note) => note.id !== noteID );
  fs.writeFile(databasePath,JSON.stringify(newArray), () => {
    res.json(newArray);
  })
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


