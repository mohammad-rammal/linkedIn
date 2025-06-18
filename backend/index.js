const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const userRoute = require("./routes/authRoute");

app.use("/api/auth", userRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on Port: ${PORT} ⚙️`);
  });
});
