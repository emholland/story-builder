// controllers/sessionController.js

import Session from "../Classes/Session";
import Agent from "../Classes/Agent";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";


let currentSession = null;
let pastSession = null;

// Create a new session instance
export const createNewSession = (title, user, prompt, agents = [], numberOfChapters) => {
  currentSession = new Session(title, user, prompt, agents, numberOfChapters);
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

export const callFakeVote = async () => {
    return(await currentSession.fakeVote());
};


//firebase stuff 

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

  // Temporary method to simulate a REST API call to get past sessions
  export const fetchPastSessionHistory = async () => {
    // This structure mimics what would eventually come from a real database
    return [
      {
        storyTitle: "The AI Revolt",
        prompt: "A world where AI takes over but helps humanity",
        createdAt: "2024-03-12T10:15:00Z",
        agents: [
          { persona: "Asimov", aiInstance: "openai" },
          { persona: "Tolkien", aiInstance: "openai" }
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
          { persona: "Steven King", aiInstance: "openai" },
          { persona: "Dr. Suess", aiInstance: "openai" }
        ],
        phases: [
          { number: 1, title: "Awakening", winner: "Steven King", outlineSnippet: "Child opens eyes to unknown", text: "The hum of the ship was the first thing she heard..." }
        ]
      }
    ];
  };

  // controllers/sessionController.js (additional fake fetch method)

export const fetchUsersPastSessions = async () => {
  // Simulated delay (optional)
  await new Promise((res) => setTimeout(res, 200));

  // Fake session data
  return [
    {
      storyTitle: "Echoes of Tomorrow",
      prompt: "A scientist receives messages from her future self",
      createdAt: "2024-01-10T14:23:00Z"
    },
    {
      storyTitle: "The Forgotten Forest",
      prompt: "Children uncover secrets in a mythical forest",
      createdAt: "2024-02-01T09:10:00Z"
    },
    {
      storyTitle: "Cyber Skies",
      prompt: "A pilot fights rogue drones in a post-apocalyptic world",
      createdAt: "2024-02-28T16:45:00Z"
    },
    {
      storyTitle: "Neon River",
      prompt: "Detective uncovers a conspiracy in a futuristic floating city",
      createdAt: "2024-03-18T11:35:00Z"
    }
  ];
};
  
