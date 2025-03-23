import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing components
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import StoryCreationPage from "./Pages/StoryCreationPage/StoryCreationPage.jsx";
import AgentScreen from "./AgentScreen.jsx";
import NewHome from "./NewHome.jsx";
import AgentGeneration from "./AgentGeneration.jsx";
import StoryCreation from "./Pages/StoryCreationPage/StoryCreationPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Wrap your app with BrowserRouter */}
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<StoryCreation/>} /> {/* Home page */}
        <Route path="/agent" element={<AgentScreen/>} /> {/* AgentScreen page */}
        <Route path="/write" element={<AgentGeneration/>} />
      </Routes>
    </Router>
  </StrictMode>
);