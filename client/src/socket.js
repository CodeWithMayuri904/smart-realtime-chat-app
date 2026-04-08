import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { // backend URL
  auth: {
    token: localStorage.getItem("token"), // JWT from login
  },
});

export default socket;