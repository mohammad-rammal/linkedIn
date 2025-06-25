const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/post", require("./routes/postRoute"));
app.use("/api/notification", require("./routes/notificationRoute"));
app.use("/api/comment", require("./routes/commentRoute"));
app.use("/api/conversation", require("./routes/conversationRoute"));
app.use("/api/message", require("./routes/messageRoute"));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on Port: ${PORT} ⚙️`);
  });
});
