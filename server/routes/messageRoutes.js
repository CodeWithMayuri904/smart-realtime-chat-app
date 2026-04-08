import express from "express";
import Message from "../models/message.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get messages between two users
router.get("/:userId", protect, async (req, res) => {
  const myId = req.user.id;
  const otherId = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: myId, receiver: otherId },
      { sender: otherId, receiver: myId }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
});

// Send message
router.post("/", protect, async (req, res) => {
  const { receiver, text } = req.body;

  const message = await Message.create({
    sender: req.user.id,
    receiver,
    text
  });

  res.json(message);
});

export default router;