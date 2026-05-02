import express from "express";
import { addFriend, getFriends } from "../controllers/friendController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addFriend);
router.get("/", protect, getFriends);

export default router;