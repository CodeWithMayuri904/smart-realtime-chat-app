import Message from "../models/message.js";

export const createMessage = async ({ sender, receiver, text }) => {
  const newMessage = new Message({ sender, receiver, text });
  const savedMessage = await newMessage.save();
  return savedMessage;
};

export const getMessages = async (req, res) => {
  const { sender, receiver } = req.params;

  const messages = await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
};