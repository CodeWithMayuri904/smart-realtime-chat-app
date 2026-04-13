import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

// const socket = io("http://localhost:3001");

function Chat() {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const me = decoded?.id;

  const bottomRef = useRef();

  // autoscroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3001/api/users", {
        headers: { Authorization: token },
      });

      setUsers(res.data.filter(u => u._id !== me));
    };

    if (token) fetchUsers();
  }, [token, me]);

  // Join socket
  useEffect(() => {
    if (me) socketRef.current.emit("join", me);
  }, [me]);

  // Receive messages (FIXED)
  useEffect(() => {
    const handleMessage = (msg) => {
      const sender = msg.sender?.toString();
      const receiver = msg.receiver?.toString();

      if (
        selectedUser &&
        (
          (sender === selectedUser._id && receiver === me) ||
          (sender === me && receiver === selectedUser._id)
        )
      ) {
        setMessages(prev => [...prev, msg]);
      }
    };
    socketRef.current.on("receiveMessage", handleMessage);

    return () => socketRef.current.off("receiveMessage", handleMessage);
  }, [selectedUser]);

  useEffect(() => {
    socketRef.current.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    socketRef.current.on("typing", ({ sender }) => {
      if (selectedUser && sender === selectedUser._id) {
        setTypingUser(sender);

        setTimeout(() => setTypingUser(null), 1500);
      }
    });
  }, [selectedUser]);

  // Typing indicator
  const handleTyping = () => {
    if (!selectedUser) return;

    socketRef.current.emit("typing", {
      sender: me,
      receiver: selectedUser._id
    });
  };

  const openChat = async (user) => {
    setSelectedUser(user);
    localStorage.setItem("selectedUser", JSON.stringify(user)); // ✅ SAVE

    const res = await axios.get(
      `http://localhost:3001/api/messages/${user._id}`,
      { headers: { Authorization: token } }
    );

    setMessages(res.data);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("selectedUser");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      openChat(user); // auto open chat
    }
  }, []);

  //  Send message
  const sendMessage = async () => {
    if (!text || !selectedUser) return;

    const payload = { receiver: selectedUser._id, text };
    console.log("Sending to:", selectedUser._id);
    console.log("ME:", me);
    console.log("TO:", selectedUser._id);

    const res = await axios.post(
      "http://localhost:3001/api/messages",
      payload,
      { headers: { Authorization: token } }
    );

    socketRef.current.emit("sendMessage", {
      sender: me,
      receiver: selectedUser._id,
      text,
    });

    // only add once
    // setMessages(prev => [...prev, res.data]);

    setText("");
  };

  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

const formatDateLabel = (date) => {
  const d = new Date(date);
  const today = new Date();

  const isToday =
    d.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    d.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return d.toLocaleDateString();
};



return (
  <div className="flex h-screen bg-[#020617] text-white">

    {/* SIDEBAR */}
    <div className="w-[300px] bg-[#020617] border-r border-gray-800 flex flex-col">

      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-lg font-semibold">Messages</h2>
        <span className="text-xl cursor-pointer">＋</span>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-[#0f172a] border border-gray-700 outline-none text-sm"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredUsers.map(u => (
          <div
            key={u._id}
            onClick={() => openChat(u)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer mb-1 transition ${
              selectedUser?._id === u._id
                ? "bg-blue-600"
                : "hover:bg-[#0f172a]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
                {u.username[0].toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium">{u.username}</p>
                <p className="text-xs text-gray-400">
                  {onlineUsers.includes(u._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {onlineUsers.includes(u._id) && (
              <span className="text-green-400 text-xs">●</span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* CHAT SECTION */}
    <div className="flex-1 flex flex-col">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div>
          <h3 className="font-semibold text-lg">
            {selectedUser ? selectedUser.username : "General Chat"}
          </h3>

          {/* ✅ Typing indicator here */}
          <p className="text-xs text-gray-400">
            {selectedUser
              ? (typingUser ? "Typing..." : "Online")
              : "Demo mode"}
          </p>
        </div>

      </div>

      {/* MAIN CONTENT */}
      {!selectedUser ? (
        //  EMPTY STATE
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">

          <div className="w-16 h-16 rounded-full bg-[#0f172a] flex items-center justify-center text-2xl mb-4">
            💬
          </div>

          <h2 className="text-lg font-semibold text-white">
            No messages yet
          </h2>

          <p className="text-sm mt-1">
            Start a conversation by selecting a user
          </p>
        </div>
      ) : (
        <>
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-6 space-y-4">
            {messages.map((m, i) => {
              const isMe =
                m.sender === me ||
                m.sender?._id === me ||
                m.sender?.toString() === me;

              const time = m.createdAt
                ? new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : "";
              // CHECK PREVIOUS MESSAGE DATE
              const prevMessage = messages[i - 1];

              const showDate =
                !prevMessage ||
                new Date(prevMessage.createdAt || Date.now()).toDateString() !==
                new Date(m.createdAt || Date.now()).toDateString();
              

               return (
                <div key={i}>
                  
                  {/* ✅ DATE SEPARATOR */}
                  {showDate && (
                    <div className="text-center text-xs text-gray-500 my-3">
                      {formatDateLabel(m.createdAt)}
                    </div>
                  )}

                  {/* MESSAGE */}
                  <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-end gap-2 max-w-[70%]">

                      {!isMe && (
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                          {selectedUser?.username?.[0]?.toUpperCase()}
                        </div>
                      )}

                      <div>
                        {!isMe && (
                          <p className="text-xs text-gray-400 mb-1">
                            {selectedUser?.username} • {time}
                          </p>
                        )}

                        <div
                          className={`px-4 py-2 rounded-2xl text-sm ${
                            isMe
                              ? "bg-blue-600 rounded-br-none"
                              : "bg-[#1e293b] rounded-bl-none"
                          }`}
                        >
                          {m.text}
                        </div>

                        {isMe && (
                          <p className="text-xs text-gray-400 mt-1 text-right">
                            {time} ✓✓
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef}></div>
          </div>

          {/* INPUT */}
          <div className="px-6 py-4 border-t border-gray-800 flex items-center gap-3">
            <input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                handleTyping();
              }}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-3 rounded-full bg-[#0f172a] border border-gray-700 outline-none text-sm"
              placeholder="Type a message..."
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);
}

export default Chat;
