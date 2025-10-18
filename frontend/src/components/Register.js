import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Fotter";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", { name, email, password });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
  
     
      if (error.response && error.response.status === 409) {
        alert("User already exists");
        return;
      }
  
      alert("Registration failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default Register;