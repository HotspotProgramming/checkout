const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/Order");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/checkout")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define the GET route for fetching orders
app.get("/orders", (req, res) => {
  Order.find()
    .sort({ createdAt: -1 }) // Sort latest first
    .then(orders => {
      res.json(orders);
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to fetch orders", details: err });
    });
});

app.post("/checkout", async (req, res) => {
  const { name, address, cardNumber, expirationDate, cvv } = req.body;

  // Basic validation
  if (!name || !address || !cardNumber || !expirationDate || !cvv) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Save order to database
    const order = new Order({ name, address, cardNumber, expirationDate, cvv });
    await order.save(); // Save the order

    // Respond with a success message
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to place order. Please try again later." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
