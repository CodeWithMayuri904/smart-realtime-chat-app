// import React, { useState, useEffect } from "react";
// import ChatBox from "./components/ChatBox";
// import InputBar from "./components/InputBar";
// import Sidebar from "./components/Sidebar";
// import socket from "./socket";

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [username, setUsername] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [typingUser, setTypingUser] = useState("");

//   // Send message
//   const sendMessage = () => {
//     console.log(message, username, selectedUser);
//     if (!message || !username || !selectedUser) return;

//     const data = {
//       sender: username,
//       receiver: selectedUser,
//       text: message
//     };

//     socket.emit("sendMessage", data);
//     setMessage("");
//   };

//   useEffect(() => {
//   fetch("http://localhost:8000/api/messages")
//     .then(res => res.json())
//     .then(data => setChat(data));

//   socket.on("receiveMessage", (data) => {
//     setChat((prev) => [...prev, data]);
//   });

//   socket.on("onlineUsers", (users) => {
//     setOnlineUsers(users);
//   });

//   socket.on("typing", (user) => {
//     setTypingUser(user);

//     setTimeout(() => setTypingUser(""), 2000);
//   });

//   return () => {
//     socket.off("receiveMessage");
//     socket.off("onlineUsers");
//     socket.off("typing");
//   };
// }, []);


//     useEffect(() => {
//     if (username) {
//       socket.emit("join", username);
//     }
//   }, [username]);

//   const handleTyping = () => {
//     socket.emit("typing", username);
//   };

//   return (

    
    
    
// <div className="h-screen flex bg-[#0f172a] text-white">

//   {/* LEFT SIDEBAR */}
//   <div className="w-[300px] bg-[#020617] border-r border-gray-800 flex flex-col">

//     {/* Top */}
//     <div className="p-4 text-lg font-semibold flex justify-between">
//       Messages
//       <span className="cursor-pointer">＋</span>
//     </div>

//     {/* Users */}
//     <div className="flex-1 overflow-y-auto">
//       {onlineUsers.map((user, i) => (
//         <div
//           key={i}
//           onClick={() => setSelectedUser(user)}
//           className={`p-3 cursor-pointer flex items-center gap-3 ${
//             selectedUser === user ? "bg-gray-800" : "hover:bg-gray-900"
//           }`}
//         >
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//             {user[0]}
//           </div>

//           <div>
//             <p className="font-medium">{user}</p>
//             <p className="text-xs text-gray-400">Online</p>
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Bottom */}
//     <div className="p-3 border-t border-gray-800">
//       ⚙️ Settings
//     </div>
//   </div>

//   {/* RIGHT CHAT AREA */}
//   <div className="flex-1 flex flex-col">

//     {/* HEADER */}
//     <div className="h-16 border-b border-gray-800 flex items-center px-4 justify-between">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//           {selectedUser ? selectedUser[0] : "?"}
//         </div>
//         <div>
//           <p className="font-semibold">{selectedUser || "Select Chat"}</p>
//           <p className="text-xs text-gray-400">Online</p>
//         </div>
//       </div>

//       <div className="flex gap-4 text-gray-400">
//         🔍 📞 🎥 ⋮
//       </div>
//     </div>

//     {/* CHAT */}
//     <div className="flex-1 overflow-y-auto p-4">
//       <ChatBox
//         chat={chat}
//         username={username}
//         selectedUser={selectedUser}
//       />
//     </div>

//     {/* INPUT */}
//     <div className="p-3 border-t border-gray-800">
//       <InputBar
//         message={message}
//         setMessage={setMessage}
//         sendMessage={sendMessage}
//         handleTyping={handleTyping}
//       />
//     </div>

//   </div>
// </div>
    

// );
// }

// export default App;






// import React, { useState, useEffect } from "react";
// import ChatBox from "./components/ChatBox";
// import InputBar from "./components/InputBar";
// import socket from "./socket";

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [username, setUsername] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [typingUser, setTypingUser] = useState("");

//   // SEND MESSAGE
//   const sendMessage = () => {
//     if (!message || !username || !selectedUser) return;

//     const data = {
//       sender: username,
//       receiver: selectedUser,
//       text: message
//     };

//     socket.emit("sendMessage", data);
//     setMessage("");
//   };

//   // SOCKET + FETCH
//   useEffect(() => {
//     fetch("http://localhost:8000/api/messages")
//     //fetch(`http://localhost:8000/api/messages/${username}/${selectedUser}`)
//       .then(res => res.json())
//       .then(data => setChat(data));

//     socket.on("receiveMessage", (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     socket.on("typing", (user) => {
//       setTypingUser(user);
//       setTimeout(() => setTypingUser(""), 2000);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("onlineUsers");
//       socket.off("typing");
//     };
//   }, []);

//   // JOIN
//   useEffect(() => {
//   if (!username || !selectedUser) return;

//   fetch(`http://localhost:8000/api/messages/${username}/${selectedUser}`)
//     .then(res => res.json())
//     .then(data => setChat(data));

// }, [username, selectedUser]);

//   const handleTyping = () => {
//     socket.emit("typing", username);
//   };

//   useEffect(() => {
//     setChat([]);
//   }, [selectedUser]);

//   return (
//     <div className="h-screen flex bg-[#0f172a] text-white">

//       {/* SIDEBAR */}
//       <div className="w-[300px] bg-[#020617] border-r border-gray-800 flex flex-col">

//         <div className="p-4 text-lg font-semibold flex justify-between">
//           Messages
//         </div>

//         {/* USERNAME INPUT */}
//         <div className="p-3">
//           <input
//             className="w-full p-2 rounded bg-gray-800 outline-none"
//             placeholder="Enter your name"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         {/* USERS */}
//         <div className="flex-1 overflow-y-auto">
//           {/* {onlineUsers.map((user, i) => ( */}
//             {onlineUsers
//               .filter(user => user !== username)
//               .map((user, i) => (
//             <div
//               key={i}
//               onClick={() => setSelectedUser(user)}
//               className={`p-3 cursor-pointer flex items-center gap-3 ${
//                 selectedUser === user ? "bg-gray-800" : "hover:bg-gray-900"
//               }`}
//             >
//               <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                 {user[0]}
//               </div>

//               <div>
//                 <p className="font-medium">{user}</p>
//                 <p className="text-xs text-gray-400">Online</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="h-16 border-b border-gray-800 flex items-center px-4 justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//               {selectedUser ? selectedUser[0] : "?"}
//             </div>

//             <div>
//               <p className="font-semibold">{selectedUser || "Select Chat"}</p>
//               <p className="text-xs text-gray-400">Online</p>
//             </div>
//           </div>
//         </div>

//         {/* CHAT */}
//         <div className="flex-1 overflow-hidden">
//           <ChatBox
//             chat={chat}
//             username={username}
//             selectedUser={selectedUser}
//           />
//         </div>

//         {/* TYPING */}
//         {typingUser && (
//           <p className="text-sm text-gray-400 px-4 pb-1">
//             ✍️ {typingUser} is typing...
//           </p>
//         )}

//         {/* INPUT */}
//         <div className="p-3 border-t border-gray-800">
//           <InputBar
//             message={message}
//             setMessage={setMessage}
//             sendMessage={sendMessage}
//             handleTyping={handleTyping}
//             disabled={!selectedUser || !username}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;










// replace app.jsx with the following code to test socket connection and message sending/receiving:



// import { useState, useEffect } from "react";
// import socket from "./socket";

// function App() {
//   const [username, setUsername] = useState("");
//   const [joined, setJoined] = useState(false);

//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   // JOIN
//   const handleJoin = () => {
//     if (!username) return;

//     socket.emit("join", username);
//     setJoined(true);
//   };

//   // SEND MESSAGE
//   const sendMessage = () => {
//     if (!message) return;

//     socket.emit("sendMessage", {
//       user: username,
//       text: message,
//     });

//     setMessage("");
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("onlineUsers");
//     };
//   }, []);

//   // BEFORE JOIN
//   if (!joined) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black text-white">
//         <div className="bg-gray-900 p-6 rounded-xl">
//           <h2 className="mb-4">Enter Username</h2>

//           <input
//             className="p-2 w-full mb-3 text-black"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <button
//             onClick={handleJoin}
//             className="bg-blue-500 px-4 py-2 w-full"
//           >
//             Join Chat
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // CHAT UI
//   return (
//     <div className="h-screen flex bg-gray-900 text-white">

//       {/* USERS */}
//       <div className="w-64 bg-black p-3">
//         <h3 className="mb-3">Online Users</h3>

//         {onlineUsers.map((user, i) => (
//           <p key={i}>{user}</p>
//         ))}
//       </div>

//       {/* CHAT */}
//       <div className="flex-1 flex flex-col">

//         <div className="flex-1 overflow-y-auto p-3">
//           {chat.map((msg, i) => (
//             <p key={i}>
//               <b>{msg.user}:</b> {msg.text}
//             </p>
//           ))}
//         </div>

//         <div className="flex p-3">
//           <input
//             className="flex-1 p-2 text-black"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 px-4"
//           >
//             Send
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;








import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

