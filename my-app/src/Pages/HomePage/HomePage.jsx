import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for routing
import AgentScreen from "../StoryCreationPage/AgentScreen";
import './HomePage.css'; // Import custom styles
import {
  user_id
} from "../../../Controllers/sessionController.js";

const HomePage = ({ navAgent }) => {
  const navigate = useNavigate(); // Get the navigate function

  const goToStoryCreation = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="homepage-container">


      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">Writer's Room<span className="dot-ellipsis"></span></h1>
          <div className="nav-links">
            
            <a className="sign-up" onClick={() => navigate('/login')}>Sign-up/Login</a>
          </div>
        </div>
      </nav>

      <>
  <img
    src="/images/CoffeeRingClosed.png"
    alt="coffee ring"
    className="coffee-ring ring-2"
  />
  <img
    src="/images/CoffeeRingSplatter.png"
    alt="coffee ring"
    className="coffee-ring ring-1"
  />

    <img
    src="/images/CoffeeRingOpen.png"
    alt="coffee ring"
    className="coffee-ring ring-3"
  />
</>

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
          <div className="hero-right sticky-note">
            <h3 className="section-title">How It Works</h3>
            <ol className="steps">
              <li>Choose an author style and create AI agents.</li>
              <li>Provide a prompt and get multiple story versions.</li>
              <li>Refine the story through AI feedback and iterations.</li>
            </ol>
          </div>
        </div>
      </header>


      {/* History Section (Centered) */}
      <div className="history-info-section">
        <div className="sticky-note history-info-card">
          <h3>Explore Your Story Sessions</h3>
          <p>
            Visit your history to review past sessions, read previous story versions,
            and track the agents that contributed to each chapter.
          </p>
          <button onClick={() => navigate(`/history/${user_id}`)} className="history-button">
            View History
          </button>
        </div>
      </div>



    </div>
  );
};

export default HomePage;
