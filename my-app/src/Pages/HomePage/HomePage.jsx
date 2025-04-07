import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for routing
import AgentScreen from "../StoryCreationPage/AgentScreen";
import './HomePage.css'; // Import custom styles

const HomePage = ({ navAgent }) => {
  const navigate = useNavigate(); // Get the navigate function

  const goToStoryCreation = () => {
    navigate('/dashboard'); // 👈 Goes to your <StoryCreation /> route
  };

  return (
    <div className="homepage-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">Story Builder</h1>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a className="sign-up" onClick={() => navigate('/login')}>Sign-up/Login</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero-section">
        <div className="hero-flex-container">
          {/* Left Side – Hero Text */}
          <div className="hero-left">
            <h2 className="hero-title">Create and Perfect Your Story</h2>
            <p className="hero-subtitle">
              Build AI agents to write in legendary styles. Collaborate, critique, and craft your masterpiece.
            </p>
            <button onClick={goToStoryCreation} className="hero-button">Start Your Story</button>
          </div>

          {/* Right Side – How It Works */}
          <div className="hero-right">
            <h3 className="section-title">How It Works</h3>
            <ol className="steps">
              <li>Choose an author style and create AI agents.</li>
              <li>Provide a prompt and get multiple story versions.</li>
              <li>Refine the story through AI feedback and iterations.</li>
            </ol>
          </div>
        </div>
      </header>

    </div>
  );
};

export default HomePage;
