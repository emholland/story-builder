import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing components
import "./index.css";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import AgentScreen from "./Pages/StoryCreationPage/AgentScreen.jsx";
import StoryCreation from "./Pages/StoryCreationPage/StoryCreationPage.jsx";
import HistoryPage from "./Pages/HistoryPage/HistoryPage.jsx";
import FinalStoryPage from "./Pages/FinalStoryPage/FinalStoryPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Wrap your app with BrowserRouter */}
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage/>} /> {/* Home page */}
        <Route path="/login" element={<LoginPage/>} /> {/* Login page */}
        <Route path="/dashboard" element={<StoryCreation/>} /> {/* Dashboard page */}
        <Route path="/agent" element={<AgentScreen/>} /> {/* AgentScreen page */}
        <Route path="/history" element={<HistoryPage/>} /> {/* History page */}
        <Route path="/finalstory" element={<FinalStoryPage />} /> {/* Final page */}
      </Routes>
    </Router>
  </StrictMode>
);