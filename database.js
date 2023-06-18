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
            name text, 
            address text,
            email text,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber INTEGER,
            expiryDate text,
            cvv INTEGER,
            timeStamp text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO products (name, address, email, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["A.D.Lakith Dharmasiri", "No 324/A Ra De Mel Road, Colombo", "lakith@gmail.com", "female", 28, "A.D.L.Dharmasiri", 102445217895, , "12/2022", 246, "2022-12-31 23:59:59"])
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



    }
})

module.exports = db

