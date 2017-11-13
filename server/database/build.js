const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname) + '/../database/game.db';

let db = new sqlite3.Database(dbPath);

let sqlCreateUsersTable = `
    CREATE TABLE IF NOT EXISTS users
    (
      id INTEGER PRIMARY KEY,
      name TEXT,
      score INTEGER,
      created DATETIME DEFAULT CURRENT_TIMESTAMP
    );`;

let sqlInsertSampleUsers = `
    INSERT INTO users (name, score) 
    VALUES(
        'Jan', 500  
    ),(
        'Stefan', 1000
    );`;

db.serialize(() => {
    db.exec("BEGIN");
    db.run(sqlCreateUsersTable);
    db.run(sqlInsertSampleUsers);
    db.exec("COMMIT");
});

db.close();