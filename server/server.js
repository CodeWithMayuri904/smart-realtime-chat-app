import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendRoutes);

// Server & Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const users = {}; // userId -> array of socketIds

io.on("connection", (socket) => {
  console.log("✅ Socket Connected:", socket.id);

  socket.on("join", (userId) => {
    if (!users[userId]) {
      users[userId] = [];
    }

    users[userId].push(socket.id);

    console.log("👤 Joined:", userId);
    console.log("Current users:", users);

    // send online users to all
    io.emit("onlineUsers", Object.keys(users));
  });

  // typing...start
  socket.on("typing", ({ sender, receiver }) => {
    if (users[receiver]) {
      users[receiver].forEach((id) => {
        io.to(id).emit("typing", { sender });
      });
    }
  });

  //typing.. stop
  socket.on("typing", ({ sender, receiver }) => {
    if (users[receiver]) {
      users[receiver].forEach((id) => {
        io.to(id).emit("typing", { sender });
      });
    }
  });

  // messages
  socket.on("sendMessage", ({ sender, receiver, text }) => {
    console.log("📩 Message:", sender, "→", receiver);

    const messageData = { sender, receiver, text };

    // send to receiver (ALL tabs)
    if (users[receiver]) {
      users[receiver].forEach((id) => {
        io.to(id).emit("receiveMessage", messageData);
      });
    }

    // send to sender 
    if (users[sender]) {
      users[sender].forEach((id) => {
        io.to(id).emit("receiveMessage", messageData);
      });
    }
  });

  socket.on("disconnect", () => {
    for (let userId in users) {
      users[userId] = users[userId].filter(id => id !== socket.id);

      if (users[userId].length === 0) {
        delete users[userId];
      }
    }

    // update online users after disconnect
    io.emit("onlineUsers", Object.keys(users));

    console.log("❌Socket Disconnected:", socket.id);
  });
});

// server.listen(process.env.PORT || 5000, () => console.log("Server running on 5000 ✅"));
const PORT = 3001;

server.listen(PORT, () => {
  console.log("Server running on " + PORT);
});