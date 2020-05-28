// server.js
// where your node app starts

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose()

const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile)
const db = new sqlite3.Database(dbFile);

// if $dbFile doesn't exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists){
    db.run(
      'CREATE TABLE Langeweile (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, eintrag TEXT)'
    );
    console.log('Table Langeweile created.')
  } else {
    console.log('Table Langeweile exists.')
  }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/eintraege", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
  db.all(
    'SELECT * from Langeweile', (err, rows) => {
      response.send(JSON.stringify(rows))
    })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
