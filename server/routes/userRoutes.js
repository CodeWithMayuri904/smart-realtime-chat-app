

// import express from "express";
// import User from "../models/user.js";

// const router = express.Router();

// // Get all users except passwords
// router.get("/", async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// });

// export default router;


import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET USERS + SEARCH
router.get("/", async (req, res) => {
  const search = req.query.search;

  let users;

  if (search) {
    users = await User.find({
      username: { $regex: search, $options: "i" }
    }).select("-password");
  } else {
    users = await User.find().select("-password");
  }

  res.json(users);
});

export default router;