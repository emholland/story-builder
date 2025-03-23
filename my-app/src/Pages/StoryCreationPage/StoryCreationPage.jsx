import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Agent from '../Classes/Agent.js'
import "./StoryCreationPage.css";


const StoryCreation = () => {
    const [userInput, setUserInput] = useState("");
    const [generatedChapter, setGeneratedChapter] = useState("");
    const [loading, setLoading] = useState(false);

    //Function to generate chapter
    const handleGenerateChapter = async () => {
        if (!prompt.trim()) {
          alert("Please enter a prompt before generating a chapter.");
          return;
        }

        try {
          const chapter = await generateChapter(prompt); // Call the function passed as a prop
          setGeneratedChapter(chapter);
        } catch (error) {
          alert("Failed to generate chapter. Please try again.");
        }
    };


    return (
        <div className="story-create-page">
            <div className="black-board">
                <div className="phase-box">Phase 1</div>

                <div className="agent-text-container">
                    <textarea placeholder="Provide agents with key details required for the story. You can be as descriptive as you want"></textarea>
                    <div className="controls">
                        <button className="generate-chapter">Generate Chapter</button>
                        <div className="arrows">
                            <button className="move-backward">⬅</button>
                            <button className="move-forward">➡</button>
                        </div>
                    </div>
                </div>

                <div className="user-box">User Info</div>
                <div className="add-agents">
                    <button>Add Agents</button>
                </div>
            </div>
            <button class="test-percent top-right">Test %</button>
        </div>
    );
};

export default StoryCreation;