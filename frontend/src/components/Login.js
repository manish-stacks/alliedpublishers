


// import React, { useState } from "react";
// import api from "../../axiosConfig";
// import { useNavigate } from "react-router-dom";
// import "./Login.css"; // Import the CSS file
// import Navbar from "./Navbar/Navbar";
// import Footer from "./Footer/Fotter";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("${process.env.REACT_APP_BACKEND_URL}/api/auth/login", { email, password });
//       console.log("Login successful:", response.data);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify({ 
//         name: response.data.name,
//         role: response.data.role // Store role
//       }));
//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="login-container">
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <p>
//         Don't have an account? <a href="/register">Register</a>
//       </p>
//       <p>
//         Forgot your password? <a href="/forgot-password">Reset Password</a>
//       </p>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Login;


import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Fotter";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post(`/api/auth/login`, { 
        email, 
        password 
      });
      console.log("Login successful:", response.data);
      
      // Store token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ 
        name: response.data.name,
        role: response.data.role
      }));
      
      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin/about-us"); // Redirect to admin about us page
      } else {
        navigate("/"); // Redirect to home page for regular users
      }
      
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <Navbar/>
      <div className="login-container">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Forgot your password? <Link to="/forgot-password">Reset Password</Link>
        </p>
      </div>
      <Footer/>
    </>
  );
};

export default Login;