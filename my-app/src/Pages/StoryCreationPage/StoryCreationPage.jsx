import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  createNewSession,
  loadSessionFromLocalStorage,
  getSessionAgents,
  generateChaptersForAgentsInParallel,
  callFakeVote,
  getAgents,
  saveSessionToFirebase,
  user_id,
  runDebatePhase 
} from "../../../Controllers/sessionController.js";
import "./StoryCreationPage.css";
import "../FinalStoryPage/FinalStoryPage.css";
import AddAgent from "../AgentPopup/AddAgent.jsx";
import Evaluation from "../../Components/Evaluation/Evaluate.jsx";
import ReactMarkdown from "react-markdown";
import ChapterInfoPopup from "../../Components/ChapterInfoPopup.jsx";


//eval
const StoryCreation = () => {
  const [title, setTitle] = useState("");
  const [userInput, setUserInput] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAccuracyPopupVisible, setIsAccuracyPopupVisible] = useState(false); // State to control accuracy popup visibility
  const [accuracyResult, setAccuracyResult] = useState('');
  const [agents, setAgents] = useState([]);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [chapterCount, setChapterCount] = useState(0);
  const [chapterTot, setChapterTot] = useState(0);
  const [chapterButtons, setChapterButtons] = useState([]);

  const [button, setButton] = useState("generate");
  const [phase, setPhase] = useState("generate");
  const navigate = useNavigate();//Navigate to Final Story Page


  const [isChpPopupOpen, setIsChpPopupOpen] = useState(false);



  const [winningChapters, setWinningChapters] = useState([]);

  const [proposalIndex, setProposalIndex] = useState(0);
  const [debatedProposals, setDebatedProposals] = useState([]); // stores each debate text
  const [isDebating, setIsDebating] = useState(false);



  
  useEffect(() => {
    setShowModal(true);
    setAgents(getAgents());
  }, []);

  useEffect(() => {
    console.log("Button state changed to:", button);
  }, [button]);
    

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate("/");
  };

  const handleStartSession = () => {
    const user = user_id;
    const prompt = userInput.trim() || "Write a story about a computer science student who learns they have superpowers.";
  
    createNewSession(title, user, prompt, agents, chapterCount);
    for (const agent of agents) {
      agent.setChapterCount(chapterCount);
    }
    setChapterTot(chapterCount+1);
    setChapterCount(0);
    setShowModal(false);
  };

  const cloneAgent = (originalAgent) => {
    const cloned = Object.create(Object.getPrototypeOf(originalAgent));
    return Object.assign(cloned, originalAgent);
  };
  

  const handleGenerateChapters = async () => {
    if(phase === "vote" && button === "generate"){
      setChapterIndex((prev) => prev + 1);
    }
    setPhase("generate");
    setButton("loading");
  
    await generateChaptersForAgentsInParallel((agent, chapter) => {
      const updatedAgent = cloneAgent(agent);
      setAgents((prevAgents) =>
        prevAgents.map((a) =>
          a.persona === updatedAgent.persona ? updatedAgent : a
        )
      );
    });

    setButton("debate");
  };

  // ADD THIS NEW FUNCTION in StoryCreation component
  const handleDebateProposal = async (proposalIndex) => {
    setPhase("debate");
    setButton("loading");
  
    try {
      const transcript = await runDebatePhase(proposalIndex); // trigger one-proposal debate
  
      const updatedAgents = getSessionAgents();
      console.log("Debate responses:", updatedAgents.map(a => a.debateResponse));
      setAgents([...updatedAgents]);
  
      // Store the transcript per proposal
      setDebatedProposals((prev) => {
        const updated = [...prev];
        updated[proposalIndex] = transcript;
        return updated;
      });
  
      const next = proposalIndex + 1;
      setProposalIndex(next);
  
      if (next === agents.length) {
        setButton("vote");
        setProposalIndex(0);
      } else {
        setButton("debate");
      }
    } catch (err) {
      console.error("Debate failed:", err);
      setButton("generate");
    }
  };
  
    
  const handleVoting = async () => {
    setPhase("vote");
    setButton("loading");
  
    const winning = await callFakeVote((updatedAgent) => {
      const cloned = cloneAgent(updatedAgent);
      setAgents((prevAgents) =>
        prevAgents.map((a) =>
          a.persona === cloned.persona ? cloned : a
        )
      );
    });
  
    console.log(agents);

    setChapterCount(chapterCount+1);
    console.log(chapterCount);

    setWinningChapters((prev) => [...prev, winning]);
  
    setButton("generate");
  };
  

  const goPreviousChapter = () => {
    if (chapterIndex > 0) {
      setChapterIndex(chapterIndex - 1);
    }
  };

  // Function to handle "Next" button click
  const goNextChapter = () => {
    if (chapterIndex < agents[0].chapterHistory.length - 1) {
      setChapterIndex(chapterIndex + 1);
    }
  };

      const goToChapter = (num) => {
        const maxIndex = agents[0]?.chapterHistory?.length;

        if (num >= 0 && num <= maxIndex) {
          console.log(`Switching to chapter ${num}`);
          setChapterIndex(num);
        } else {
          console.warn(`Chapter ${num} is out of bounds (max: ${num})`);
        }
        
      };

        const updateAgents = () => {
            const freshAgents = [...getAgents()]; // 👈 Force a new array reference
            console.log("Updated Agents:", freshAgents);
            setAgents(freshAgents);
          
        };

      
      

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const checkAccuracy = async (agent) => {
    try {
      const accuracyResponse = await agent.testAccuracy();
      console.log("Accuracy Evaluation for", agent.persona, ":", accuracyResponse);
      setAccuracyResult(`Accuracy for ${agent.persona}: ${accuracyResponse}`);
      setIsAccuracyPopupVisible(true); // Show the accuracy popup
    } catch (error) {
      console.error("Error checking accuracy:", error);
    }
  };

  const openChpPopup = () => {
    console.log("open phase info for: " + chapterIndex);
    setIsChpPopupOpen(true);
  };

  const closeChpPopup = () => {
    setIsChpPopupOpen(false);
  };



  return (
    <div className="story-create-page">
      <div className="black-board">
      <button onClick={handleLogout} className="user-box">Log Out</button>
      {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">

              <h2>Welcome to Story Builder!</h2>
              <p>Let’s get started on your new story.</p>

            

              {/* Title & Chapter Count */}
              <div className="title-chapter-row">
              <div className="title-input-container">
                <label>Title:</label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title Here!"
                  className="title-input"
                />
                </div>

                <div className="chapter-input-group">
                  <label htmlFor="quantity" className="chapter-number-label">Chapters:</label>
                  <input
                    className="chapter-number-input"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="15"
                    value={chapterCount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setChapterCount(value);
                      const buttons = Array.from({ length: value+1 }, (_, i) => i);
                      setChapterButtons(buttons);
                    }}
                  />
                </div>
              </div>

              {/* Story Prompt */}
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter story details or setup..."
                className="story-details-textarea"
              />

              {/* Agent List Box */}
              <div className="agent-display improved-agent-box">
                <div className="agent-box-header">
                  <h3>AI Agents</h3>
                  <div className="add-agents">
                    <AddAgent isOpen={isPopupOpen} onClose={togglePopup} updateAgents={updateAgents}>
                      Add Agent
                    </AddAgent>
                  </div>
                </div>


                <ul>
                  {agents.length > 0 ? (
                    <div className="agent-strip-sc">
                    {agents.map((agent, index) => (
                      <div
                        key={index}
                        className="agent-box-sc"
                        onClick={() => setSelectedAgent(agent)}
                      >
                        <img
                          src={agent.profile?.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${agent.persona}`}
                          alt={agent.persona}
                          className="agent-avatar-sc"
                        />
                        <span>{agent.persona}</span>
                      </div>
                    ))}
                  </div>
                  
                  ) : (
                    <p>No agents have been added yet</p>
                  )}
                </ul>
              </div>

              {/* Final CTA */}
              <button className="start-session-button" onClick={handleStartSession}>
                Start Session
              </button>
            </div>
          </div>
        )}


        <button className="phase-box chapter-heading-button" onClick={() => openChpPopup()}>
            {chapterIndex === 0 ? "Outline" : `Chapter ${chapterIndex}`}
        </button>

        {isChpPopupOpen && (
          <ChapterInfoPopup
            isOpen={isChpPopupOpen}
            onClose={closeChpPopup}
            index={chapterIndex}
          />
        )}


                <div className="chapter-controls">
                    <button className="chapter-button" onClick={() => goPreviousChapter()}>⬅</button>
                      {chapterButtons.map((num) => (
                          <button
                                    key={num}
                                    className="chapter-button"
                                    onClick={ () => goToChapter(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            <button className="chapter-button" onClick={() => goNextChapter()}>➡</button>
                        </div>

                        {phase === "vote" && winningChapters[chapterIndex] && (
                          <div className="winning-chapter-display">
                            <h3>Winning Text</h3>
                            <ReactMarkdown>
                              {winningChapters[chapterIndex]}
                            </ReactMarkdown>
                          </div>
                        )}




                        <div className="dialogue-container">
                          <div className="dialogue-layout">
                            {agents.map((agent, index) => {
                              const isLeft = index % 2 === 0;
                              return (
                                <div key={index} className="dialogue-row">
                                  {isLeft ? (
                                    <>
                                      <div className="agent-side left">
                                        <img
                                          className="agent-avatar"
                                          src={agent.profile?.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${agent.persona}`}
                                          alt={agent.persona}
                                        />
                                        <div className="speech-bubble left">
                                        <strong>{agent.persona}</strong>
                                        {phase === "generate" && (
                                          <ReactMarkdown>
                                          {typeof agent.chapterHistory?.[chapterIndex] === "string"
                                            ? agent.chapterHistory[chapterIndex]
                                            : "*...*"}
                                        </ReactMarkdown>
                                        
                                        )}

                                        {phase === "vote" && (
                                          <ReactMarkdown>
                                          {typeof agent.votingReasoning?.[chapterIndex] === "string"
                                            ? agent.votingReasoning[chapterIndex]
                                            : "*...*"}
                                        </ReactMarkdown>
                                        
                                        )}

                                        {phase === "debate" && (
                                          <ReactMarkdown>
                                            {agent.debateResponse || "*...*"}
                                          </ReactMarkdown>
                                        )}
                                        </div>
                                      </div>
                                      <div className="agent-side right empty" />
                                    </>
                                  ) : (
                                    <>
                                      <div className="agent-side left empty" />
                                      <div className="agent-side right">
                                        <div className="speech-bubble right">
                                          <strong>{agent.persona}</strong>

                                          {phase === "generate" && (
                                            <ReactMarkdown>
                                            {typeof agent.chapterHistory?.[chapterIndex] === "string"
                                            ? agent.chapterHistory[chapterIndex]
                                            : "*...*"}
                                          </ReactMarkdown>
                                          
                                          )}

                                          {phase === "debate" && (
                                            <ReactMarkdown>
                                              {agent.debateResponse || "*...*"}
                                            </ReactMarkdown>
                                          )}

                                          {phase === "vote" && (
                                            <ReactMarkdown>
                                            {typeof agent.votingReasoning?.[chapterIndex] === "string"
                                            ? agent.votingReasoning[chapterIndex]
                                              : "*...*"}
                                          </ReactMarkdown>
                                          
                                          )}

                                        </div>
                                        <img
                                          className="agent-avatar"
                                          src={agent.profile?.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${agent.persona}`}
                                          alt={agent.persona}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="agent-table-section">
                            <div className="agent-portrait-row">
                              {agents.map((agent, index) => (
                                <div className="agent-behind-table" key={index}>
                                  <img
                                    className="agent-headshot"
                                    src={agent.profile?.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${agent.persona}`}
                                    alt={agent.persona}
                                  />
                                </div>
                              ))}
                            </div>
                            <img
                              src="/images/table.png" // make sure this file is in your public folder or use import if it's local
                              alt="table"
                              className="table-image"
                            />
                          </div>


  {isAccuracyPopupVisible && (
    <div className="popup-overlay" onClick={() => setIsAccuracyPopupVisible(false)}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => setIsAccuracyPopupVisible(false)}>✕</button>
        <h2>Agent Accuracy</h2>
        <p className="accuracy-response">{accuracyResult}</p>
      </div>
    </div>
  )}
</div>
        <button onClick={() => navigate(`/`)} className="home-button">
          Home
        </button>

        <div className="bottom-button-row">
  { chapterTot === chapterCount ? (
    // ✅ If finished, only show Read Final Story button
    <button
      className="bottom-button"
      onClick={() => {
        const finalStory = agents[0].getVotedChapterHistory();
        console.log("Final story before navigation:", finalStory);
        navigate("/finalstory", { state: { finalStory } });
      }}
    >
      Read Your Final Story
    </button>
  ) : (
    // ❗ If not finished yet, show View History + Vote/Generate
    <>
      <button
        className="bottom-button"
        onClick={() => navigate(`/history/${user_id}`)}
      >
        View History
      </button>

      {button === "generate" && (
        <button className="bottom-button" onClick={handleGenerateChapters}>
          Generate Chapters
        </button>
      )}

{button === "debate" && (
  <div className="debate-phase-display">
    <div className="debate-section">
      <button
        className="bottom-button"
        onClick={() => handleDebateProposal(proposalIndex)}
        disabled={isDebating}
      >
        Debate Proposal {proposalIndex + 1}
      </button>
    </div>
  </div>
)}

      
      {button === "vote" && (
        <button className="bottom-button" onClick={handleVoting}>
          Vote
        </button>
      )}
      
      {button === "loading" && (
        <button className="bottom-button" disabled>
          Loading...
        </button>
      )}
    </>
  )}
</div>

  
  </div>

        
      </div>
  );
};

export default StoryCreation;
