const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("THIS SERVER FILE IS RUNNING");
const PORT = 8000;

const app = express(); // first create app

// Middleware
app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require("./routes/authRoutes");

// Routes
app.use("/api/auth", (req, res, next) => {
  console.log("Auth route hit");
  next();
}, authRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected✅"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/check", (req, res) => {
  res.send("Working");
});



