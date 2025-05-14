import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase.js"; // Ensure correct Firebase import
import Email from "../../Components/LoginComponents/Email.jsx";
import Password from "../../Components/LoginComponents/Password.jsx";
import { loginUser, registerUser } from "../../../Controllers/sessionController.js";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);


  const handleLogin = async () => {
    const result = await loginUser(email, password);
    if (result.success) {
      localStorage.setItem('isLoggedIn', 'true');
      setMessages((prev) => [...prev, { type: "success", message: "Logged in successfully!" }]);
      navigate("/dashboard");
    } else {
      setMessages((prev) => [...prev, { type: "error", message: result.error }]);
    }
  };

  const handleCreateAccount = async () => {
    const result = await registerUser(email, password);
    if (result.success) {
      setMessages((prev) => [...prev, { type: "success", message: "Account created! Now, log in." }]);
    } else {
      setMessages((prev) => [...prev, { type: "error", message: result.error }]);
    }
  };

  return (
    <div className="login-page">
      {/* Left side: Image container */}
      <div className="login-page-image-container">
        
      </div>

      
      <div className="login-separator"></div>

      {/* Right side: Login form */}
      <div className="login-form-container">
        <h1 className="login-page-hero-text">Sign In</h1>
        
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <Email value={email} onChange={(e) => setEmail(e.target.value)}  />
          <Password value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="login-button" onClick={handleLogin} disabled={!email || !password}>Log in</button>
          <button className="create-account-button" onClick={handleCreateAccount} disabled={!email || !password}>Create Account</button>
        </form>

        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index} className={`message ${msg.type}`}>{msg.message}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;