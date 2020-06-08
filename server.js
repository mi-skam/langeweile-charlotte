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
  if (!exists) {
    db.run(
      "CREATE TABLE langeweile (id INTEGER PRIMARY KEY, name TEXT, eintrag TEXT)"
    );
    console.log('Table langeweile created.');
  } else {
    console.log('Table langeweile exists.');
  }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/eintraege", (request, response) => {
  db.all(
    'SELECT * from langeweile', (err, rows) => {
      if (err) {
        console.log(err)
      }
      response.send(JSON.stringify(rows))
    })
});

app.post("/eintrag", (request, response) => {
  const entry = {
    name: cleanseString(request.body.eintrag),
    text: cleanseString(request.body.name)
  }

  db.run(
    'INSERT into langeweile(id, name, eintrag) VALUES (NULL, ?, ?)', [entry.name, entry.text], (err) => {
      if (err) {
        response.send({ message: "error!" });
      } else {
        //response.send({ message: "success" });
        response.redirect("/")
      }
    })
})

app.get("/eintraege-entfernen", (request, response) => {
  db.each(
    "SELECT * from langeweile",
    (err, row) => {
      console.log("row", row);
      db.run(`DELETE FROM langeweile WHERE ID=?`, row.id, error => {
        if (row) {
          console.log(`deleted row ${row.id}`);
        }
      });
    },
    err => {
      if (err) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }
    }
  );
});


// helper function that prevents html/css/script malice
const cleanseString = function (string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
const listener = app.listen(46793, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
