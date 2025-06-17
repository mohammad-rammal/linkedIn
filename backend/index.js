const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on Port: ${PORT} ⚙️`);
  });
});
