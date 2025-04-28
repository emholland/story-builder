import React from "react";
import { useLocation } from "react-router-dom";
import "./FinalStoryPage.css";
import { useNavigate } from "react-router-dom";



function FinalStoryPage() {
    const location = useLocation();
    const finalStory = location.state?.finalStory;
    const navigate = useNavigate();

    
    return (
         <div className="final-story-container">
          <button onClick={() => navigate(`/`)} className="home-button">
            Home
          </button>
        <h1>Your Final Story!</h1>
        <div className="story-box">
        {finalStory?.split("\n\n").map((paragraph, index) => {
        // Check if paragraph is wrapped with ** **
        if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
          const boldText = paragraph.slice(2, -2); // Remove the ** from start and end
          return <p key={index} style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                 {boldText}
        </p>;
      } else {
          return <p key={index}>{paragraph}</p>;
  }
})}
      </div>
        </div>
  );

}

export default FinalStoryPage;