const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Change to your desired port number

app.use(bodyParser.json());

// Import your database connection library and the 'database.js' file.
const db = require('your-database-library');
const database = require('./database');

// API to register a customer
app.post('/register', (req, res) => {
  const customerData = req.body;

  // Add validation for email address and credit card number here.
  // You can use regular expressions or a validation library.

  // Insert customer data into the 'customer' table
  db.none(
    `INSERT INTO customer (name, address, email, date_of_birth, gender, age, card_holder_name, card_number, expiry_date, cvv, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      customerData.name,
      customerData.address,
      customerData.email,
      customerData.dateOfBirth,
      customerData.gender,
      customerData.age,
      customerData.cardHolderName,
      customerData.cardNumber,
      customerData.expiryDate,
      customerData.cvv,
      customerData.timestamp,
    ]
  )
    .then(() => {
      res.status(201).json({
        message: `Customer ${customerData.name} has registered`,
        customerId: '2', // This should be the generated ID from the database.
      });
    })
    .catch((error) => {
      console.error('Error registering customer:', error);
      res.status(400).json({ message: 'Bad Request' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
