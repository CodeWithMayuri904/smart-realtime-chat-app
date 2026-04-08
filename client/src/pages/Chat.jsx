import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function Chat() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

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
    if (me) socket.emit("join", me);
  }, [me]);

  // Receive messages (FIXED)
  useEffect(() => {
    const handleMessage = (msg) => {
      const sender = msg.sender?.toString();
      const receiver = msg.receiver?.toString();

      if (
        selectedUser &&
        (sender === selectedUser._id || receiver === selectedUser._id)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    };

    // const handleMessage = (msg) => {
    //    FIX: convert everything to string
    //   const sender = msg.sender.toString();
    //   const receiver = msg.receiver.toString();

    //   if (
    //     selectedUser &&
    //     (sender === selectedUser._id || receiver === selectedUser._id)
    //   ) {
    //     setMessages(prev => [...prev, msg]);
    //   }
    // };

    socket.on("receiveMessage", handleMessage);

    return () => socket.off("receiveMessage", handleMessage);
  }, [selectedUser]);


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

    socket.emit("sendMessage", {
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

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "30%", borderRight: "1px solid gray", padding: "10px" }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        {filteredUsers.map(u => (
          <div
            key={u._id}
            onClick={() => openChat(u)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: selectedUser?._id === u._id ? "#ddd" : "",
            }}
          >
            {u.username}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div style={{ width: "70%", display: "flex", flexDirection: "column", padding: "10px" }}>
        <h3>{selectedUser ? selectedUser.username : "Select a user"}</h3>

        <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
          {messages.map((m, i) => {
            const isMe =
              m.sender === me ||
              m.sender?._id === me ||
              m.sender?.toString() === me;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    background: isMe ? "#4CAF50" : "#eee",
                    color: isMe ? "white" : "black",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "60%",
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>

        {selectedUser && (
          <div style={{ display: "flex", marginTop: "10px" }}>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              style={{ flex: 1, padding: "10px" }}
              placeholder="Type message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
