// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const login = async () => {
//     const res = await axios.post("http://localhost:5000/api/auth/login", {
//       email, password
//     });

//     localStorage.setItem("token", res.data.token);
//     nav("/chat");
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input onChange={e => setEmail(e.target.value)} placeholder="email"/>
//       <input onChange={e => setPassword(e.target.value)} placeholder="password"/>
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username);
      nav("/chat");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;