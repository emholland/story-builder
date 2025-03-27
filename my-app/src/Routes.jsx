import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing components
import "./index.css";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import NewHome from "./Pages/HomePage/NewHome.jsx";
import AgentScreen from "./Pages/StoryCreationPage/AgentScreen.jsx";
import StoryCreation from "./Pages/StoryCreationPage/StoryCreationPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Wrap your app with BrowserRouter */}
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<NewHome/>} /> {/* Home page */}
        <Route path="/login" element={<LoginPage/>} /> {/* Login page */}
        <Route path="/dashboard" element={<StoryCreation/>} /> {/* Dashboard page */}
        <Route path="/agent" element={<AgentScreen/>} /> {/* AgentScreen page */}
      </Routes>
    </Router>
  </StrictMode>
);