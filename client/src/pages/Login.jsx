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












// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:3001/api/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", res.data.userId);
//       localStorage.setItem("username", res.data.username);
//       nav("/chat");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/chat";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="bg-[#0f172a] p-8 rounded-2xl shadow-lg w-[350px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#020617] border border-gray-700 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#020617] border border-gray-700 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;