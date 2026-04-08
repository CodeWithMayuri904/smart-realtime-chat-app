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

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", { username, email, password });
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;