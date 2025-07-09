const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(express.static('public'))

let orders = []; // In-memory store, just for example

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/new-order", (req, res) => {
  const { pickup, material, dropoff, time } = req.body;
  if (!pickup || !material || !dropoff || !time) {
    return res.status(400).json({ status: "Missing required fields" });
  }

  orders.push({ pickup, material, dropoff, time });
  res.json({ status: "Order saved" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Order server running at http://localhost:${PORT}`);
});
