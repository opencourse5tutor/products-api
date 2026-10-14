const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("Connected to the SQLite database.");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS customer (
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            gender TEXT NOT NULL,
            age INTEGER NOT NULL,
            cardHolderName TEXT NOT NULL,
            cardNumber TEXT NOT NULL,
            expiryDate TEXT NOT NULL,
            cvv TEXT NOT NULL,
            timeStamp TEXT NOT NULL
        )`,
    (err) => {
      if (err) {
        console.error("Table creation failed:", err.message);
      }
    },
  );
});

module.exports = db;
