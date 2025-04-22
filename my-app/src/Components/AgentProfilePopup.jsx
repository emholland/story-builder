// AgentProfilePopup.jsx
import React from "react";
import "./AgentProfilePopup.css";

const AgentProfilePopup = ({ agent, onClose }) => {
  if (!agent) return null;

  const { profile, chapterHistory = [] } = agent;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="agent-profile-header">
          <img src={profile.picture} alt={profile.name} className="agent-profile-img" />
          <div className="agent-profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.description}</p>
          </div>
        </div>

        <div className="agent-chapters">
          <h3>Chapters by {profile.name}</h3>
          <ol>
            {chapterHistory.map((chapter, index) => (
              <li key={index}>{chapter}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AgentProfilePopup;
