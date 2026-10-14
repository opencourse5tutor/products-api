const express = require("express");
const db = require("./database");

const app = express();
const PORT = 8081;
app.use(express.json());

app.post("/api/customer", (req, res) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        error: "A customer JSON object is required.",
      });
    }

    const fields = [
      "name",
      "address",
      "email",
      "dateOfBirth",
      "gender",
      "age",
      "cardHolderName",
      "cardNumber",
      "expiryDate",
      "cvv",
      "timeStamp",
    ];

    const errors = [];

    for (const field of fields) {
      const value = body[field];

      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
      ) {
        errors.push(`${field} is required.`);
      } else if (field !== "age" && typeof value !== "string") {
        errors.push(`${field} must be a string.`);
      }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof body.email !== "string" || !emailPattern.test(body.email)) {
      errors.push("Enter a valid email address.");
    }

    if (
      typeof body.cardNumber !== "string" ||
      !/^\d{12}$/.test(body.cardNumber)
    ) {
      errors.push("Card number must contain exactly 12 digits.");
    }

    const age = Number(body.age);

    if (
      !["string", "number"].includes(typeof body.age) ||
      !Number.isSafeInteger(age) ||
      age < 0
    ) {
      errors.push("Age must be a non-negative whole number.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: errors.join(" "),
      });
    }

    const sql = `
            INSERT INTO customer (
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
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const params = fields.map((field) => (field === "age" ? age : body[field]));

    db.run(sql, params, function (err) {
      if (err) {
        console.error("Registration failed:", err.message);

        return res.status(400).json({
          error: "Customer registration failed.",
        });
      }

      return res.status(201).json({
        message: `customer ${body.name} has registered`,
        customerId: String(this.lastID),
      });
    });
  } catch (err) {
    return res.status(400).json({
      error: "Invalid customer data.",
    });
  }
});

app.use((err, req, res, next) => {
  return res.status(400).json({
    error: "Invalid request body.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
