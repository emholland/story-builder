import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase.js"; // Ensure correct Firebase import
import Email from "../../Components/LoginComponents/Email.jsx";
import Password from "../../Components/LoginComponents/Password.jsx";
//import CreateAccountButton from "../../Components/LoginComponents/CreateAccountButton.jsx";
import { handleAuthentication } from "../../Components/LoginComponents/Authenication.jsx";
import "./LoginPage.css";

const fetchImages = async () => {
  try {
    const docRef = doc(db, "FrontendImages", "LoginScreenImage");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().imageUrl;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

const LoginPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchImages();
      setImageUrl(url);
    };
    loadImage();
  }, []);

  const handleLogin = () => {
    handleAuthentication(email, password, "login", navigate, setMessages);
  };

  const handleCreateAccount = () => {
    handleAuthentication(email, password, "create", null, setMessages);
  };

  return (
    <div className="login-page">
      {/* Left side: Image container */}
      <div className="login-page-image-container">
        {imageUrl && <img src={imageUrl} alt="Login Illustration" className="login-image" />}
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