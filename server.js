var express = require("express");
var app = express();
var db = require("./database.js");
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080;
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// Existing API routes for products, suppliers, etc.

app.get("/api/products", (req, res, next) => {
    try {
        var sql = "SELECT * FROM products";
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

// Other existing endpoints (e.g., for products, suppliers, etc.) remain unchanged.

// Customer Registration API
app.post("/api/customers/register", (req, res) => {
    const {
        name, 
        address, 
        email, 
        dateOfBirth, 
        gender, 
        age, 
        cardHolderName, 
        cardNumber, 
        expiryDate, 
        cvv, 
        timeStamp
    } = req.body;

    // Validate required fields
    if (!name || !address || !email || !dateOfBirth || !gender || !age || !cardHolderName || !cardNumber || !expiryDate || !cvv || !timeStamp) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValidEmail) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate credit card and CVV
    const isValidCardNumber = /^\d{12}$/.test(cardNumber.trim());
    const isValidCvv = /^\d{3}$/.test(cvv.trim());
    if (!isValidCardNumber) {
        return res.status(400).json({ error: "Invalid credit card number. Must be 12 digits." });
    }
    if (!isValidCvv) {
        return res.status(400).json({ error: "Invalid CVV. Must be 3 digits." });
    }

    // Insert into database
    const sql = `INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ error: "Registration failed. Email may already exist." });
        }
        res.status(201).json({
            message: `Customer ${name} has registered successfully.`,
            customerId: this.lastID
        });
    });
});

// Root path
app.get("/", (req, res) => {
    res.json({ "message": "University of Moratuwa" });
});
