// server.js
// where your node app starts

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose()

const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile);

// if $dbFile doesn't exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists){
    db.run(
      'CREATE TABLE Langeweile (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOTNULL, eintrag TEXT NOTNULL)'
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
  db.all(
    'SELECT * from Langeweile', (err, rows) => {
      response.send(JSON.stringify(rows))
    })
});

app.post("/eintrag", (request, response) => {
  const entry = {
    name: cleanseString(request.body.name),
    text: cleanseString(request.body.text)
  }
  db.run(
    `INSERT into Langeweile VALUES (?, ?)`,[entry.name, entry.text], (err) => {
      if (err) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }})
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};