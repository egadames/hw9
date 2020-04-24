// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '/db/db.json');
var Generator = require('id-generator');
const database = require('./db/db.json');

// Tells node that we are creating an 'express' server
var app = express();

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This creates a route to the public folder
app.use(express.static('public'));

// This creates a route to the notes.html
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// This performs the get request to get the data
// from the database
app.get('/api/notes', function(req, res) {
  fs.readFile(databasePath, (err,data) => {
    let notes = JSON.parse(data);
    res.json(notes);
  })
});

// This performs the post request to update the data
// from the database
app.post('/api/notes', function(req, res) {
  var g = new Generator();
  let newNote = req.body;
  newNote.id = g.newId();
  fs.readFile(databasePath, (err,data) => {
    let notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(databasePath,JSON.stringify(notes), () => {
      res.json(notes);
    })
  })
});

// This performs the delete request to delete the data
// from the database
app.delete('/api/notes/:id', function(req, res) {
  let noteID = req.params.id;

  fs.readFile(databasePath, (err,data) => {
    let notes = JSON.parse(data);
    let newArr = notes.filter((note) => note.id !== noteID );
    fs.writeFile(databasePath,JSON.stringify(newArr), () => {
     res.json(newArr);
   })
  })
});

//This is the listener
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});


