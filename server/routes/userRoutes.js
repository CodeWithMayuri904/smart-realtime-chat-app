

import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Get all users except passwords
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;