// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [data, setData] = useState({});
//   const nav = useNavigate();

//   const register = async () => {
//     await axios.post("http://localhost:5000/api/auth/register", data);
//     nav("/");
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input placeholder="username" onChange={e => setData({...data, username: e.target.value})}/>
//       <input placeholder="email" onChange={e => setData({...data, email: e.target.value})}/>
//       <input placeholder="password" onChange={e => setData({...data, password: e.target.value})}/>
//       <button onClick={register}>Register</button>
//     </div>
//   );
// }

// export default Register;



//  no ui 
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const register = async () => {
//     try {
//       await axios.post("http://localhost:3001/api/auth/register", { username, email, password });
//       nav("/");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Registration failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button onClick={register}>Register</button>
//     </div>
//   );
// }

// export default Register;


import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username,
        email,
        password,
      });

      alert("Account created!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="bg-[#0f172a] p-8 rounded-2xl shadow-lg w-[350px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account 🚀
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#020617] border border-gray-700 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;