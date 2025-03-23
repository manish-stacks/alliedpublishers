
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://alliedpublications-11.onrender.com/api/auth/register", { name, email, password });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    }
  };

  return (
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
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;