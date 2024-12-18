var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text, 
            description text,
            category text,
            brand text,
            expiredDate text,
            manufacturedDate text,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["White Basmathi Rice", "White Basmathi Rice imported from Pakistan. High-quality rice with extra fragrance. Organically grown.", "Rice", "CIC", "2023.05.04", "2022.02.20", 324567, , 1020, 200, "2022.02.24"])
            }
        })


        db.run(`CREATE TABLE suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplierName text, 
            address text,
            joinedDate text,
            mobileNo text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO suppliers (supplierName, address, joinedDate, mobileNo) VALUES (?,?,?,?)'
                db.run(insert, ["D.J.Ishara", "345A ,R.A De Mel Road, Colombo 3", "16/3/2022", "0776600933"])

            }
        })

db.run(`CREATE TABLE customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            address TEXT,
            email TEXT UNIQUE,
            dateOfBirth TEXT,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timeStamp TEXT
        )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, inserting provided details
                var insert = `INSERT INTO customers 
                (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                db.run(insert, [
                    "Bavithran", 
                    "Jaffna", 
                    "bavithran@gmail.com", 
                    "1991.02.25", 
                    "male", 
                    28, 
                    "Bavithran", 
                    "102445217895", 
                    "12/2022", 
                    "246", 
                    "2022-12-31 23:59:59"
                ]);
            }
        });


    }
})

module.exports = db

