const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/post", require("./routes/postRoute"));
app.use("/api/notification", require("./routes/notificationRoute"));
app.use("/api/comment", require("./routes/commentRoute"));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on Port: ${PORT} ⚙️`);
  });
});
