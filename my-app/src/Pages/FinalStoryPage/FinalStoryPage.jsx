import React from "react";
import { useLocation, useNavigate} from "react-router-dom";
import "./FinalStoryPage.css";



function FinalStoryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const finalStory = location.state?.finalStory;
    const user_id = location.state?.user_id;
    
    return (
         <div className="final-story-container">
        <h1>Your Final Story!</h1>
        <div className= "button-container" style={{marginBottom: "20px", display: "flex", gap:"10px"}}>
          <button onClick={() => navigate(`/history/${user_id}`)} className="history-button">
          View History
        </button>
        <button onClick={() => navigate(`/`)} 
            className="home-button"
            style={{ 
              backgroundColor: "rgba(85, 85, 85, 0.9)", 
              color: "white",
              position: "absolute", 
              top: "20px",             
              right: "20px",           
              padding: "10px 20px",    
              borderRadius: "8px",    
              border: "none",
              cursor: "pointer" }}>
          Back to Home
        </button>
        </div>
        
        <div className="story-box">
        {finalStory?.split("\n\n").map((paragraph, index) => {
    return (
      <p key={index}>
        {paragraph.split("**").map((part, partIndex) =>
          partIndex % 2 === 1 ? (
            <span key={partIndex} style={{ fontWeight: "bold", fontSize : "1.25rem" }}>{part}</span>
          ) : (
            <span key={partIndex}>{part}</span>
          )
        )}
      </p>
    );
  })}
</div>
        </div>
  );

}

export default FinalStoryPage;