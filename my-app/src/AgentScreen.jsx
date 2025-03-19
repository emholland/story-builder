import React, { useEffect, useState } from "react";
import "./AgentScreen.css"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AddAgent from './Components/AddAgent.jsx'
import Agent from '../Classes/Agent.js'

const AgentScreen = () => {
    const [agents, setAgents] = useState([]);
    const [deepSeekResponse, setDeepSeekResponse] = useState("");
    const [openAIResponse, setOpenAIResponse] = useState("");
    const [deepSeekLoading, setDeepSeekLoading] = useState(false); // loading state for DeepSeek
    const [openAILoading, setOpenAILoading] = useState(false); // loading state for OpenAI
    
    const navigate = useNavigate();

const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "deepseek") {
        navigate("/write"); 
    } else if (selectedValue === "openai") {
        navigate("/"); 
    }
};
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

    const fetchDeepSeekResponse = async () => {
        setDeepSeekLoading(true);
        try {
            for (const agent of agents){
                await agent.generateChapter("Write a story about a computer science student who learns they have superpowers.");
                console.log(agent);
             }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setDeepSeekResponse("An error occurred while fetching the response.");
        } finally {
            setDeepSeekLoading(false);
        }
    };

    const generateOpenAIResponse = async () => {
        setOpenAILoading(true);
        try {
             for (const agent of agents){
                await agent.generateChapter("Write a 6 word poem.");
                console.log(agent);
             }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setOpenAIResponse("An error occurred while fetching the response.");
        } finally {
            setOpenAILoading(false);
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
