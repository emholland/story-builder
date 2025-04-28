// controllers/sessionController.js

import Session from "../Classes/session";
import Agent from "../Classes/Agent";
import User from "../Classes/User";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, setDoc, doc, Timestamp, updateDoc, arrayUnion, getDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { personas } from "../data/Personas.js";

let currentSession = null;
let pastSession = null;
let user_id;
let session_id = "";
let story_id = "";
let agent_ids = [];

const agents = [];

const getAgents = () => {
  return agents;
};

const resetAgents = () => {
  agents.length = 0;
};

export {
  getAgents,
  resetAgents,
  agents, // optional: direct export
  agent_ids,
  story_id,
  session_id,
  user_id
};

const auth = getAuth();

export const loginUser = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    user_id = auth.currentUser.uid;
    console.log("User ID:", user_id);
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
export const createNewSession = (title, user, prompt, agents = [], numberOfChapters) => {
  currentSession = new Session(title, user, prompt, agents, numberOfChapters);
  saveSessionToFirebase(user);
  saveSessionToLocalStorage();
  resetAgents();
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
  console.log(currentSession);

  await Promise.all(currentSession.agents.map(async (agent) => {
      if (currentSession.currentChapter == 0) {
          try {
              const outline = await agent.generateOutline(currentSession.prompt);
              agent.outline = outline;
              if (typeof onProgress === "function") {
                  onProgress(agent, outline);
              }
          } catch (error) {
              console.error(`Error generating chapter for ${agent.persona}:`, error);
              if (typeof onProgress === "function") {
                  onProgress(agent, "⚠️ Error generating chapter");
              }
          }
      } else {
          try {
              const chapter = await agent.generateChapter(currentSession.story.outline, currentSession.story.chapters[currentSession.currentChapter]);
              agent.chapters.push(chapter); 
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
  }));

  await updateAgentsOutline(user_id);
  await updateAgentsChapter(user_id);

  // Optional: Save once all are updated (or save individually in onProgress)
};


//firebase stuff 

export const callFakeVote = async () => {
  const winningChapter = await currentSession.fakeVote();

  const sessionDoc = doc(db, "Users", user_id, "Sessions", session_id);

  const sessionSnap = await getDoc(sessionDoc);
  if (!sessionSnap.exists()) {
      throw new Error("Session does not exist");
  }

  const sessionData = sessionSnap.data();

  if (!sessionData.story.outline) {
    await updateDoc(sessionDoc, {
        "story.outline": winningChapter                 // first winner to story.outline
    });
  } else {                                              // subsequent winners to story.chapters array
      await updateDoc(sessionDoc, {
          "story.chapters": arrayUnion(winningChapter)
      });
  }

  return winningChapter;
};

export const saveAgentToFirebase = async (persona, aiInstance, userId) => {
  if (!persona || !aiInstance || !userId) {
    console.error("Missing required fields to save agent.");
    return { success: false, message: "Persona, AI instance, and user ID are required." };
  }

  const newAgent = new Agent(persona, aiInstance);
  agents.push(newAgent);

  const agentData = {
    agent_id: "",
    agent_persona: persona,
    model: aiInstance,
    outline: "",
    chapters: [],
    date: Timestamp.now(),
  };

  try {
    
    const agentRef = await addDoc(collection(db, "Users", userId, "Agents"), agentData);
    const agent_ID = agentRef.id;
    newAgent.agentid = agent_ID;
    await updateDoc(agentRef, { agent_id: agent_ID });
    agent_ids.push(agent_ID);
    console.log("Agents ID list: ", agent_ids);

    return { success: true, message: "Agent created and saved successfully", agent: { ...agentData, agent_ID }, };
  } catch (error) {
    console.error("Error saving agent:", error);
    return { success: false, message: "Failed to save agent." };
  }
};

export const saveSessionToFirebase = async (userId) => {
  console.log("DEBUG -- currentSession:", currentSession);
  console.log("DEBUG -- userId:", userId);
  if (!currentSession || !userId) {
    console.error("Missing required fields to save session.");
    return { success: false, message: "Current session and user ID are required." };
  }

  const sessionData = {
    session_id: "", 
    title: currentSession.title,
    user: currentSession.user,
    prompt: currentSession.prompt,
    agents: currentSession.agents.map(agent => ({
      agent_id: agent.agentid,
      persona: agent.persona,
      model: agent.aiInstance,
    })),
    numberOfChapters: currentSession.numberOfChapters,
    story: {
    outline: currentSession.story.outline || "",
    chapters: currentSession.story.chapters || [],
    },
    date: Timestamp.now(),
  };

  console.log(sessionData);
  try {
    const sessionRef = await addDoc(collection(db, "Users", userId, "Sessions"), sessionData);
    const session_ID = sessionRef.id;
    currentSession.sessionid = session_ID;
    await updateDoc(sessionRef, { session_id: session_ID });
    session_id = session_ID;

    console.log("Session ID list: ", session_id);

    return { success: true, message: "Session created and saved successfully", session: { ...sessionData, session_ID } };
  } catch (error) {
    console.error("Error saving session:", error);
    return { success: false, message: "Failed to save session." };
  }
};

  export const updateAgentsOutline = async (user_id) => {
    console.log("USERID: ", user_id);
    console.log("Current Sesh: ", currentSession);
    console.log("Current Sesh Agents: ", currentSession.agents);
    if (!user_id || !currentSession || !Array.isArray(currentSession.agents) || currentSession.agents.length === 0) {
      console.error("User ID and valid agents array are required to update outlines.");
      return { success: false, message: "Invalid input data." };
    }
  
    try {
      const updatePromises = currentSession.agents.map(async (agent) => {
        const agentRef = doc(db, "Users", user_id, "Agents", agent.agentid);
        if (agent.outline) {
          await updateDoc(agentRef, { outline: agent.outline });
          console.log(`Updated outline for agent ${agent.agentid}:`, agent.outline);
        }
      });
  
      await Promise.all(updatePromises);
  
      console.log("All agent outlines updated successfully.");
      return { success: true, message: "All agent outlines updated." };
    } catch (error) {
      console.error("Error updating agent outlines:", error);
      return { success: false, message: "Failed to update agent outlines." };
    }
  };
  

  export const updateAgentsChapter = async (user_id) => {
    if (!user_id || !currentSession || !Array.isArray(currentSession.agents) || currentSession.agents.length === 0) {
      console.error("User ID and valid agents array are required to update outlines.");
      return { success: false, message: "Invalid input data." };
    }
    try {
      const updatePromises = currentSession.agents.map(async (agent) => {
        const agentRef = doc(db, "Users", user_id, "Agents", agent.agentid);
        if (agent.chapters) {
          await updateDoc(agentRef, { chapters: agent.chapters });
          console.log(`Updated chapter for agent ${agent.agentid}:`, agent.chapters);
        }
      });
  
      await Promise.all(updatePromises);
  
      console.log("All agent chapters updated successfully.");
      return { success: true, message: "All agent chapters updated." };
    } catch (error) {
      console.error("Error updating agent chapters:", error);
      return { success: false, message: "Failed to update agent chapters." };
    }
  };


// controllers/sessionController.js

// Temporary in-memory session store
const fakeSessions = [
  {
    storyTitle: "The AI Revolt",
    prompt: "A world where AI takes over but helps humanity",
    createdAt: "2024-03-12T10:15:00Z",
    agents: [
      { persona: "Dr. Suess", aiInstance: "openai", profile: "Dr. Suess" },
      { persona: "Shakespeare", aiInstance: "openai" }
    ],
    phases: [
      { number: 1, title: "Rise", winner: "Asimov", outlineSnippet: "AI begins to gain awareness", text: "AI systems started coordinating..." },
      { number: 2, title: "Alliance", winner: "Tolkien", outlineSnippet: "Humans and AI unite", text: "Together they forged a pact..." }
    ]
  },
  {
    storyTitle: "Lost in the Stars",
    prompt: "A child wakes up on a spaceship",
    createdAt: "2024-02-20T08:45:00Z",
    agents: [
      { persona: "Stephen King", aiInstance: "openai", profile: "Dr. Suess"},
      { persona: "Dr. Suess", aiInstance: "openai" }
    ],
    phases: [
      { number: 1, title: "Awakening", winner: "Steven King", outlineSnippet: "Child opens eyes to unknown", text: "The hum of the ship was the first thing she heard..." }
    ]
  }
];

// Return a list of titles for display in dropdown
export const fetchUsersPastSessions = async (user_id) => {
  console.log("Fetching past sessions for user:", user_id); // Debugging user_id

  if (!user_id) {
    console.error("User ID is undefined or null");
    return [];
  }

  try {
    // Get the "Sessions" collection for the specific user
    const sessionsRef = collection(db, "Users", user_id, "Sessions");

    console.log("Sessions reference:", sessionsRef); // Debugging collection reference

    const snapshot = await getDocs(sessionsRef);
    console.log("Snapshot data:", snapshot); // Debugging snapshot

    if (snapshot.empty) {
      console.log("No sessions found for this user.");
      return [];
    }

    // Map over the snapshot to extract session titles
    const sessionTitles = snapshot.docs.map(doc => doc.data().title);
    console.log("Session Titles:", sessionTitles); // Debugging result

    return sessionTitles;
  } catch (error) {
    console.error("Error fetching past sessions:", error);
    return [];
  }
};

// Return full session object based on title
/*export const fetchPastSessionByTitle = async (title) => {
  await new Promise((res) => setTimeout(res, 150));
  const session = fakeSessions.find(session => session.storyTitle === title);
  if (!session) return null;

   // Inject profile into agents
   session.agents = session.agents.map(agent => ({
    ...agent,
    profile: personas[agent.persona] || null,
  }));

  return session;
};*/

export const fetchPastSessionByTitle = async (title) => {
  try {
    const sessionsRef = collection(db, "Users", user_id, "Sessions");
    const q = query(sessionsRef, where("title", "==", title));

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log("No session found with that title.");
      return null;
    }

    // Assuming there is only one session with this title, take the first document
    const sessionDoc = snapshot.docs[0];
    const sessionData = sessionDoc.data();
    console.log("Session data:", sessionData);
    console.log("Session Data Agents:", sessionData.agents); // Check agents data

    // Fetch chapters from each agent's document in the "Agents" collection
    const agentsWithChapters = await Promise.all(
      sessionData.agents.map(async (agent) => {
        const agentRef = doc(db, "Users", user_id, "Agents", agent.agent_id);
        const agentSnapshot = await getDoc(agentRef);
        const agentData = agentSnapshot.data();
        console.log("Agent Data:", agentData);

        return {
          ...agent,
          profile: personas[agent.persona] || null,
          chapters: agentData ? agentData.chapters || [] : [], // If agent data exists, fetch chapters
          outline: agentData ? agentData.outline || "" : "",
        };
      })
    );

    sessionData.agents = agentsWithChapters; // Add the chapters to the agents

    return sessionData;
  } catch (error) {
    console.error("Error fetching session by title:", error);
    return null;
  }
};