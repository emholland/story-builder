import React from "react";
import Username from "./Username";
import Password from "./Password";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder logic: Simulates successful login
        navigate("/dashboard"); // Change "/dashboard" to actual route later
      };
    
    return (
        <div className="login-page">
        <div className="login-page-image-container">
        <img
          src="" // Placeholder, replace with Firebase Storage fetch logic
          alt="Login Illustration"
          className="login-image"
        />
      </div>

      <div className="login-separator"></div>

      <div className="login-form-container">
        <h1 className="login-page-hero-text">Create an account</h1>
        <p className="login-page-subtext">
        Already have an account? <button className="login-text-button" onClick={() => navigate("/login")}>Log in</button>
        </p>

        <form className="login-form">
          <Username />
          <Password />
          <CreateAcountButton/>
        </form>
      </div>
    </div>

    );
};
export default LoginPage;

