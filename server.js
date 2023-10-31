var express = require("express")
var app = express()
var db = require("./database.js")
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let HTTP_PORT = 8080
const cors = require('cors');
app.use(cors({
    origin: '*'
}));



// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/api/products", (req, res, next) => {
    try {
        var sql = "select * from products"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }

});

app.get("/api/products/:id", (req, res, next) => {
    try {
        var sql = "select * from products where id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.get("/api/products/quantity/:quantity", (req, res, next) => {
    try {
        var row = "[]"
        var sql = "select * from products where quantity > ?"
        var params = [req.params.quantity]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.get("/api/products/unitPrice/:unitPrice", (req, res, next) => {
    try {
        var row = "[]"
        var sql = "select * from products where unitPrice > ?"
        var params = [req.params.unitPrice]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.json({

                    "message": "success",
                    "data": row
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.post("/api/products/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batchNumber,
            unitPrice,
            quantity,
            createdDate
        } = req.body;

        var sql = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)'
        var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate]
        const { name, 
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

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv,timeStamp]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "success",
                    "message": "customer $name has registered",
                    "data": req.body,
                    "id": this.lastID
                    "customerId": this.lastID
                })
            }

@@ -144,26 +60,24 @@ app.post("/api/products/", (req, res, next) => {
    }
});


app.put("/api/products/", (req, res, next) => {


    const {
        id,
        productName,
        description,
        category,
        brand,
        expiredDate,
        manufacturedDate,
        batchNumber,
        unitPrice,
        quantity,
        createdDate
        customerId,
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

    db.run(`UPDATE products set productName = ?, description = ?, category = ?, brand = ?,expiredDate=?,manufacturedDate=?,batchNumber=?,unitPrice=?,quantity=?,createdDate=? WHERE id = ?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate, id],
    db.run(`UPDATE customer. set name = ?, address = ?, email = ?, dateOfBirth = ?, gender=?,age=?,cardHolderName=?,cardNumber=?,expiryDate=?,cvv=?,timeStamp=? WHERE customerId = ?`,
        [name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp,customerId],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
@@ -177,7 +91,7 @@ app.put("/api/products/", (req, res, next) => {
app.delete("/api/products/delete/:id", (req, res, next) => {
    try {
        db.run(
            'DELETE FROM products WHERE id = ?',
            'DELETE FROM customer WHERE customerId = ?',
            req.params.id,
            function (err, result) {
                if (err) {
@@ -194,7 +108,7 @@ app.delete("/api/products/delete/:id", (req, res, next) => {
app.delete("/api/products/deleteAll/:id", (req, res, next) => {
    try {
        db.run(
            'DELETE FROM products WHERE id > ?',
            'DELETE FROM customer WHERE customerId = ?',
            req.params.id,
            function (err, result) {
                if (err) {
@@ -209,9 +123,9 @@ app.delete("/api/products/deleteAll/:id", (req, res, next) => {
});


app.get("/api/suppliers/", (req, res, next) => {
app.get("/api/products/", (req, res, next) => {
    try {
        var sql = "select * from suppliers"
        var sql = "select * from customer"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
@@ -230,61 +144,7 @@ app.get("/api/suppliers/", (req, res, next) => {
});


app.post("/api/suppliers/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { supplierName,
            address,
            joinedDate,
            mobileNo
        } = req.body;

        var sql = 'INSERT INTO suppliers (supplierName, address, joinedDate, mobileNo) VALUES (?,?,?,?)'
        var params = [supplierName, address, joinedDate, mobileNo]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "success",
                    "data": req.body,
                    "id": this.lastID
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.delete("/api/suppliers/deleteAll/:id", (req, res, next) => {
    try {
        db.run(
            'DELETE FROM suppliers WHERE id > ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes })
            });
    } catch (E) {
        res.status(400).send(E);
    }
});


// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "University of Moratuwa" })
});
});
