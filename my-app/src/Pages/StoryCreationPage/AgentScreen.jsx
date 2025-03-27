import React, { useEffect, useState } from "react";
import "./AgentScreen.css"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AddAgent from '../AgentPopup/AddAgent.jsx'
import Agent from '../../../Classes/Agent.js'

const AgentScreen = () => {
    const [agents, setAgents] = useState([]);
    const [deepSeekResponse, setDeepSeekResponse] = useState("");
    const [openAIResponse, setOpenAIResponse] = useState("");
    const [deepSeekLoading, setDeepSeekLoading] = useState(false); // loading state for DeepSeek
    const [openAILoading, setOpenAILoading] = useState(false); // loading state for OpenAI
    const [isPopupOpen, setIsPopupOpen] = useState(false);  // State to control popup visibility

    // Function to update the list of agents after adding a new agent
    const updateAgents = (newAgent) => {
        const nAgent = new Agent(newAgent.persona, newAgent.aiInstance);
        setAgents((prevAgents) => [...prevAgents, nAgent]);  // Add the new agent to the existing list
        console.log("Front end recieved: ", nAgent);
    };

    // Toggle the popup visibility
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const checkAccuracy = async (agent) => {
        try{
            const accuracyResponse = await agent.testAccuracy();
            console.log("Accuracy Evaluation for", agent.persona, ":", accuracyResponse);
        alert(`Accuracy for ${agent.persona}: ${accuracyResponse}`);
        }catch (error){
            console.error("Error checking accuracy:", error);
        }
    };

    return (
        <div>
            <h2>DeepSeek AI Chat</h2>
            <button onClick={fetchDeepSeekResponse} disabled={deepSeekLoading}>
                {deepSeekLoading ? "Generating..." : "Generate Response"}
            </button>
            {deepSeekResponse && <p><strong>Response:</strong> {deepSeekResponse}</p>}
     
            <br />
 
            <h2>OpenAI AI Chat</h2>
            <button onClick={generateOpenAIResponse} disabled={openAILoading}>
                {openAILoading ? "Generating..." : "Generate Response"}
            </button>
            {openAIResponse && <p><strong>Response:</strong> {openAIResponse}</p>}
   
            {/* The Popup component */}
            <AddAgent isOpen={isPopupOpen} onClose={togglePopup} updateAgents={updateAgents}>
                <h2>Add Agent</h2>
            </AddAgent>
            <br></br>
            <div>
                <h3>AI Agents List</h3>
                <ul>
                    {agents.length > 0 ? (
                        agents.map((agent, index) => (
                            <li key={index}>
                                <strong>AI:</strong> {agent.aiInstance}
                                <strong> &nbsp; Persona:</strong> {agent.persona}... 
                                <br></br>{agent.chapter}
                                <br />
                                <button onClick={() => checkAccuracy(agent)}>Check Accuracy</button>
                            </li>

                        ))
                    ) : (
                        <p>No agents available</p>
                    )}
                </ul>
            </div>
            
        </div>
    );
};

export default AgentScreen;
