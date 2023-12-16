// database.js

var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");

    // Create products table
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName TEXT, 
            description TEXT,
            category TEXT,
            brand TEXT,
            expiredDate TEXT,
            manufacturedDate TEXT,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate TEXT
        )`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table "products" created successfully.');
        }
      }
    );

    // Create suppliers table
    db.run(
      `CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplierName TEXT, 
            address TEXT,
            joinedDate TEXT,
            mobileNo TEXT
        )`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table "suppliers" created successfully.');
        }
      }
    );

    // Create customer table
    db.run(
      `CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            email TEXT,
            dateOfBirth TEXT,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timestamp TEXT
        )`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table "customer" created successfully.');
        }
      }
    );
  }
});

module.exports = db;
