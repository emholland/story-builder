import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for routing
import AgentScreen from "../StoryCreationPage/AgentScreen";
import './HomePage.css'; // Import custom styles

const HomePage = ({ navAgent }) => {
  return (
    <div className="homepage-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">Story Builder</h1>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#signup" className="get-started">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Create and Perfect Your Story</h2>
          <p className="hero-subtitle">
            Build AI agents to write stories in legendary styles. Collaborate, critique, and craft your masterpiece.
          </p>
          <button onClick={navAgent} className="hero-button">Start Your Story</button>
        </div>
      </header>

      {/* How It Works */}
      <section id="how-it-works" className="info-section">
        <h3 className="section-title">How It Works</h3>
        <ol className="steps">
          <li>Choose an author style and create AI agents.</li>
          <li>Provide a prompt and get multiple story versions.</li>
          <li>Refine the story through AI feedback and iterations.</li>
        </ol>
      </section>
    </div>
  );
};

export default HomePage;
