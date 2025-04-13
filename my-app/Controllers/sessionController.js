// controllers/sessionController.js

import Session from "../Classes/Session";
import Agent from "../Classes/Agent";
import User from "../Classes/User";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

let currentSession = null;

const auth = getAuth();

export const loginUser = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
  
    return { success: true, user: new User(user.email, password, user.uid) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const registerUser = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    console.log("(1) Email:", user.email);
    console.log("(2) Password:", password); // not saved to firebase, just debug display
    console.log("(3) UID:", user.uid);

    const userData = new User(user.email, password, user.uid).toJSON(); // password is not submitted to firebase

    await setDoc(doc(db, "Users", user.uid), userData);                 // saves user data (email and uid) to firebase

    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Create a new session instance
export const createNewSession = (user, prompt, agents = [], numberOfChapters) => {
  currentSession = new Session(user, prompt, agents, numberOfChapters);
  saveSessionToLocalStorage();
  return currentSession;
};

// Get current session instance
export const getCurrentSession = () => currentSession;


// Get all agents in session
export const getSessionAgents = () => {
  return currentSession?.getAgents() || [];
};

export const getPhase = (index) => {
    console.log(currentSession.phases);
    if (!currentSession || !currentSession.phases || !currentSession.phases[index]) {
      return null;
    }

    return currentSession.phases[index];
  };
  

// Persist to localStorage
export const saveSessionToLocalStorage = () => {
  if (currentSession) {
    const sessionData = currentSession.toJSON();
    localStorage.setItem("session", JSON.stringify(sessionData));
  }
};

// Load from localStorage
export const loadSessionFromLocalStorage = () => {
  const data = localStorage.getItem("session");
  if (!data) return null;

  const parsed = JSON.parse(data);
  const loadedSession = new Session();
  loadedSession.fromJSON(parsed);
  currentSession = loadedSession;
  return currentSession;
};

// Reset session
export const resetSession = () => {
  currentSession = null;
  localStorage.removeItem("session");
};

export const generateChaptersForAgentsInParallel = async (onProgress) => {
    currentSession.agents.forEach(async (agent) => {
        if(currentSession.currentChapter == 0){
            try {
                const chapter = await agent.generateOutline(currentSession.prompt);
                if (typeof onProgress === "function") {
                onProgress(agent, chapter);
                }
            } catch (error) {
                console.error(`Error generating chapter for ${agent.persona}:`, error);
                if (typeof onProgress === "function") {
                onProgress(agent, "⚠️ Error generating chapter");
                }
            }
        }else{
            try {
                const chapter = await agent.generateChapter(currentSession.story.outline, currentSession.story.chapters[currentSession.currentChapter]); 
                if (typeof onProgress === "function") {
                onProgress(agent, chapter);
                }
            } catch (error) {
                console.error(`Error generating chapter for ${agent.persona}:`, error);
                if (typeof onProgress === "function") {
                onProgress(agent, "⚠️ Error generating chapter");
                }
            }
        }
    });
  
    // Save once all are updated (optional — or save individually in onProgress)
  };

export const callFakeVote = () => {
    return(currentSession.fakeVote());
};


//firebase stuff 
export const saveAgentToFirebase = async (persona, aiInstance, userId) => {
  if (!persona || !aiInstance || !userId) {
    console.error("Missing required fields to save agent.");
    return { success: false, message: "Persona, AI instance, and user ID are required." };
  }

  const agentData = {
    agent_persona: persona,
    chapterHistory: [],
    aiInstance,
    outline: "",
    totalChapters: 0,
    date: Timestamp.now(),
    agent_vote: {
      agent_id: null,
      target_id: null,
    },
  };

  try {
    const agentRef = await addDoc(collection(db, "Users", userId, "Agents"), agentData);
    const agentId = agentRef.id;

    // Optional: update the agent with its ID after it's created
    // await updateDoc(agentRef, { agent_id: agentId });

    return {
      success: true,
      message: "Agent created and saved successfully",
      agent: { ...agentData, agentId },
    };
  } catch (error) {
    console.error("Error saving agent:", error);
    return { success: false, message: "Failed to save agent." };
  }
};

export const saveSessionToFirebase = async () => {
    if (!currentSession) return;
  
    const sessionData = currentSession.toJSON();
  
    try {
      const docRef = await addDoc(collection(db, "sessions"), {
        ...sessionData,
        createdAt: Timestamp.now(),
      });
  
      console.log("Session saved to Firebase with ID:", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error saving session to Firebase:", e);
    }
  };
  
