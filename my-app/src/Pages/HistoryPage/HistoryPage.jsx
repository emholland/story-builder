// HistoryPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsersPastSessions, fetchPastSessionByTitle } from "../../../Controllers/sessionController";
import './HistoryPage.css';
import AgentProfilePopup from "../../Components/AgentProfilePopup.jsx";


const HistoryPage = () => {
  const [sessionTitles, setSessionTitles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);


  useEffect(() => {
    const loadTitles = async () => {
      const titles = await fetchUsersPastSessions();
      setSessionTitles(titles);
    };
    loadTitles();
  }, []);
  

  const handleSessionSelect = async (title) => {
    const session = await fetchPastSessionByTitle(title);
    setActiveSession(session);
    setMenuOpen(false);
  };

  return (
    <div className="history-container">
      {/* Sidebar dropdown menu */}
      <div className="sidebar">
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-toggle">
          <span></span>
        </button>
        {menuOpen && (
          <ul className="dropdown-menu">
            {sessionTitles.map((title, i) => (
              <li key={i}>
                <button onClick={() => handleSessionSelect(title)}>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main display area */}
      <div className="main-history">
        <h1>Story Session History</h1>
        {!activeSession ? (
          <p>Select a session from the menu to view details.</p>
        ) : (
          <div className="session-card">
            <h2>{activeSession.storyTitle}</h2>
            <p><strong>Prompt:</strong> {activeSession.prompt}</p>
            <p><strong>Date:</strong> {activeSession.createdAt || "Unknown"}</p>

            {/* Agent list */}
            <div className="agent-container">
                <h3>Agents</h3>
                <div className="agent-strip">
                {activeSession.agents?.map((agent, index) => (
                    <div key={index} className="agent-box" onClick={() => setSelectedAgent(agent)}>
                        <img src={agent.profile?.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${agent.persona}`} alt={agent.persona} />
                        <span>{agent.persona}</span>
                    </div>
                    ))}

                </div>
            </div>

            {selectedAgent && (
                <AgentProfilePopup agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
            )}


            {/* Phase list */}
            <div className="phase-column">
                <h3>Chapters</h3>
              {activeSession.phases?.map((phase, index) => (
                <div key={index} className="phase-box-history">
                  <h4>Chapter {phase.number}: {phase.title}</h4>
                  <p><strong>Winner:</strong> {phase.winner}</p>
                  <p><strong>Outline Snippet:</strong> {phase.outlineSnippet}</p>
                  <p>{phase.text}</p>
                </div>
              ))}
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
