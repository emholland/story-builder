// HistoryPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPastSessionHistory } from "../../../Controllers/sessionController";
import './HistoryPage.css';

const HistoryPage = () => {
    const [savedSessions, setSavedSessions] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSessionIndex, setActiveSessionIndex] = useState(null);
  
    useEffect(() => {
      const loadSessions = async () => {
        const sessions = await fetchPastSessionHistory();
        setSavedSessions(sessions);
      };
      loadSessions();
    }, []);
  
    return (
      <div className="history-container">

         {/* Sidebar dropdown menu */}
      <div className="sidebar" style={{ marginRight: '2rem' }}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-toggle">
          ☰
        </button>
        {menuOpen && (
          <ul className="dropdown-menu">
            {savedSessions.map((session, i) => (
              <li key={i}>
                <button onClick={() => setActiveSessionIndex(i)}>
                  {session.storyTitle || `Session #${i + 1}`}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

        <h1>Story Session History</h1>
        {savedSessions.length === 0 ? (
          <p>No saved sessions found.</p>
        ) : (
          <ul className="session-list">
            {savedSessions.map((session, i) => (
              <li key={i} className="session-card">
                <h3>{session.storyTitle || `Session #${i + 1}`}</h3>
                <p><strong>Prompt:</strong> {session.prompt}</p>
                <p><strong>Date:</strong> {session.createdAt || "Unknown"}</p>
                <Link to={`/history/${i}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default HistoryPage;