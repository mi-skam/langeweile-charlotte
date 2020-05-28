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
      "CREATE TABLE langeweile (id INTEGER PRIMARY KEY, name TEXT, eintrag TEXT)"
    );
    console.log('Table langeweile created.');
  } else {
    console.log('Table langeweile exists.');
  }
  
  const stmt = db.prepare("INSERT INTO langeweile (id, name, eintrag) VALUES (NULL, ?, ?)");
  stmt.run(0, "maksim", "hello db");
  stmt.finalize();
  
  
})

db.close()

