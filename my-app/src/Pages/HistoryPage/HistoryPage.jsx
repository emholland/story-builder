// HistoryPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsersPastSessions, fetchPastSessionByTitle, user_id } from "../../../Controllers/sessionController";
import './HistoryPage.css';
import AgentProfilePopup from "../../Components/AgentProfilePopup.jsx";
import { useNavigate } from "react-router-dom";


const HistoryPage = () => {
  const [sessionTitles, setSessionTitles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const loadTitles = async () => {
      if (user_id) {
        const titles = await fetchUsersPastSessions(user_id);
        setSessionTitles(titles);
      }
    };
    loadTitles();
  }, [user_id]);
  

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
      <button onClick={() => navigate(`/`)} className="home-button">
        Home
      </button>

      {/* Main display area */}
      <div className="main-history">
        <h1>Story Session History</h1>
        {!activeSession ? (
          <p>Select a session from the menu to view details.</p>
        ) : (
          <div className="session-card">
            <h2>{activeSession.title}</h2>
            <p><strong>Prompt:</strong> {activeSession.prompt}</p>
            <p><strong>Date:</strong> {activeSession.date.toDate().toLocaleString() || "Unknown"}</p> {/* Date conversion */}
            <p><strong>Number of Chapters:</strong> {activeSession.numberOfChapters}</p>

            {/* Agent list */}
            <div className="agent-container">
                <h3>Agents</h3>
                <div className="agent-strip">
                {activeSession.agents?.map((agent, index) => (
                    <div key={index} className="agent-box" onClick={() => setSelectedAgent(agent)}>
                        <img src={agent.profile?.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${agent.persona}`} alt={agent.persona} />
                        <span>{agent.persona}</span>
                        <p><strong>Agent ID:</strong> {agent.agent_id}</p>
                    </div>
                    ))}

                </div>
            </div>

            {selectedAgent && (
                <AgentProfilePopup agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
            )}


            {/* Story Details */}
            <div className="story-details">
              <h3>Story Details</h3>
              <p><strong>Outline:</strong> {activeSession.story?.outline}</p>
              <p><strong>Chapters:</strong> {activeSession.story?.chapters}</p>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
