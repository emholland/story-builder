import React from "react";
import { useLocation } from "react-router-dom";
import "./FinalStoryPage.css";



function FinalStoryPage() {
    const location = useLocation();
    const finalStory = location.state?.finalStory;
    
    return (
         <div className="final-story-container">
        <h1>Your Final Story!</h1>
        <div className="story-box">
        {finalStory?.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
        </div>
  );

}

export default FinalStoryPage;