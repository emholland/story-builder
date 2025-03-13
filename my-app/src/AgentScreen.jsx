import React, { useEffect, useState } from "react";
import "./AgentScreen.css"
import axios from "axios";
import AddAgent from './Components/AddAgent.jsx'

const AgentScreen = () => {
    const [agents, setAgents] = useState([]);
    const [deepSeekResponse, setDeepSeekResponse] = useState("");
    const [openAIResponse, setOpenAIResponse] = useState("");
    const [deepSeekLoading, setDeepSeekLoading] = useState(false); // loading state for DeepSeek
    const [openAILoading, setOpenAILoading] = useState(false); // loading state for OpenAI
    const [isPopupOpen, setIsPopupOpen] = useState(false);  // State to control popup visibility

    // Fetch the list of agents from the backend
    const fetchAgents = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/agents');
            setAgents(response.data); // Assuming your backend returns an array of agents
        } catch (error) {
            console.error('Error fetching agents:', error);
        }
    };

    // Function to update the list of agents after adding a new agent
    const updateAgents = (newAgent) => {
        console.log("Agent added!");
        setAgents((prevAgents) => [...prevAgents, newAgent]);  // Add the new agent to the existing list
    };

    // Toggle the popup visibility
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const fetchDeepSeekResponse = async () => {
        setDeepSeekLoading(true);
        try {
            const res = await axios.post("http://localhost:5001/api/chat", {
                prompt: "Write me a short poem, a few words",
            });

            setDeepSeekResponse(res.data.choices[0].text);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setDeepSeekResponse("An error occurred while fetching the response.");
        } finally {
            setDeepSeekLoading(false);
        }
    };

    const fetchOpenAIResponse = async () => {
        setOpenAILoading(true);
        try {
            const res = await axios.post("http://localhost:5001/api/openai", {
                prompt: "Write me an 6 word poem.",
            });

            setOpenAIResponse(res.data.message);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setOpenAIResponse("An error occurred while fetching the response.");
        } finally {
            setOpenAILoading(false);
        }
    };

    return (
        <div>
            <p></p>
            <h2>DeepSeek AI Chat</h2>
            <button onClick={fetchDeepSeekResponse} disabled={deepSeekLoading}>
                {deepSeekLoading ? "Generating..." : "Generate Response"}
            </button>
            {deepSeekResponse && <p><strong>Response:</strong> {deepSeekResponse}</p>}
     
            <br />
 
            <h2>OpenAI AI Chat</h2>
            <button onClick={fetchOpenAIResponse} disabled={openAILoading}>
                {openAILoading ? "Generating..." : "Generate Response"}
            </button>
            {openAIResponse && <p><strong>Response:</strong> {openAIResponse}</p>}

            {/* The Popup component */}
            <AddAgent isOpen={isPopupOpen} onClose={togglePopup} updateAgents={updateAgents}>
                <h2>Add Agent</h2>
            </AddAgent>
            <br></br>
            <div>
                <h3>Agents List</h3>
                <ul>
                    {agents.length > 0 ? (
                        agents.map((agent, index) => (
                            <li key={index}>
                                <strong>Persona:</strong> {agent.persona}
                                {/* You can add other properties of the agent if you have more */}
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
