/* Imports:
 -Node/express - Our backend functions to be able to make API calls and other necessary backend tools
 CORS - allows our front-end to access by front-end applciations on different origins
 axios - similar to CORS allows react to access API requests
 dotenv - to use .env files for retrieving keys
 */

import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import Agent from "./Classes/Agent.js"
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//ports, express() to initialize our backend for calls to be made. port to launch our backend and keep it up
const app = express();
const port = 80;


//enables cors to be used for API calls. .use is for middleware
app.use(cors());
app.use(express.json());




//test used to retrieve data from the server
app.get("/", (req, res) => {
    res.send("testing!");
});

//  post used to send data to the server to retrieve from DeepSeek 
app.post("/api/chat", async (req, res) => {
    const { prompt } = req.body;
    const { persona } = req.body; 
    const fullPrompt = "You are a helpful assitant that writes like " + persona + ". " + prompt;

    try {
         const response = await axios.post(
             "https://api.deepseek.com/v1/chat/completions",
             {
                 model: "deepseek-chat",
                 messages: [{ role: "user", content: fullPrompt }],
             },
             {
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                 },
             }
         );
 
         console.log("deepseek: ", response.data);
         res.json(response.data);
     } catch (error) {
         console.error("DeepSeek API Error:", error.response?.data || error.message);
         res.status(500).json({ error: error.response?.data || error.message });
     }
 });
 
 const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY,
 });
 
 app.post('/api/openai', async (req, res) => {
     try {
         const { userPrompt, persona } = req.body;
         const systemPrompt = "You are a helpful assistant that writes like " + persona;
 
         const completion = await openai.chat.completions.create({
             model: "gpt-4o-mini",
             messages: [
                 { role: "system", content: systemPrompt },
                 { role: "user", content: userPrompt },
             ],
         });
 
         console.log("openai: ", completion.choices[0].message.content);
         res.json({ message: completion.choices[0].message.content });
     } catch (error) {
         console.error("Error fetching completion:", error);
         res.status(500).json({ error: 'Failed to fetch completion' });
     }
 });
 
 let agents = [];
 
 app.post('/api/agents', (req, res) => {
     const { persona, aiInstance } = req.body;
 
     if (!persona) {
         return res.status(400).json({ message: 'Persona is required' });
     }
 
     const newAgent = new Agent(persona, aiInstance);
     agents.push(newAgent);
 
     res.status(201).json({
         message: 'Agent created successfully',
         agent: newAgent,
     });
 });
 
 const server = app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
 });
 
 const wss = new WebSocketServer({ server });
 
 wss.on("connection", (ws) => {
     console.log("🌐 WebSocket client connected");
 
     ws.on("message", async (message) => {
         try {
             const { provider, prompt, persona = "", type = "default" } = JSON.parse(message);
 
             if (!provider || !prompt) {
                 return ws.send(JSON.stringify({ type: "error", message: "Missing provider or prompt" }));
             }
 
             if (provider === "openai") {
                 await handleOpenAIStream(ws, prompt, persona, type);
             } else if (provider === "deepseek") {
                 await handleDeepSeekFakeStream(ws, prompt, persona, type);
             } else {
                 ws.send(JSON.stringify({ type: "error", message: "Unknown provider" }));
             }
         } catch (err) {
             console.error("WebSocket error:", err);
             ws.send(JSON.stringify({ type: "error", message: err.message }));
         }
     });
 
     ws.on("close", () => {
         console.log("❌ WebSocket client disconnected");
     });
 });
 
 async function handleOpenAIStream(ws, prompt, persona, type) {
     const systemPrompt =
     type === "writer"
     ? `You are a helpful assistant that writes like ${persona}. Write a story based on the prompt below in that author's writing style in about 100 words. Only return the story:\n\n`
     : persona
     ? `You are a helpful assistant that writes like ${persona}.`
     : "You are a helpful assistant.";
 
     const userPrompt =
         type === "evaluate"
             ? `Evaluate this chapter and return only a markdown-formatted evaluation with a critical evaluation, point out things that can be imporved and inconsistencies, exlcude any excess messages and only include the evaluation:\n\n${prompt}`
             : prompt;
    const numberPrompt = 
        type === "numberEval"
        ? `Evaluate this chapter and return only a markdown-formatted evaluation with a rating from, evaluate it critically, don't be biased and only score from 80-100 use all ranges and be consistent, use numbers 1-100, exlcude any excess messages and only include the number:\n\n${prompt}`
        : null;
        const actualPrompt =
        type === "writer"
          ? prompt // Use raw story idea
          : type === "numberEval"
          ? numberPrompt
          : userPrompt;
 
     const completion = await openai.chat.completions.create({
         model: "gpt-4o-mini",
         messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: actualPrompt },
         ],
         stream: true,
     });
 
     for await (const chunk of completion) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          ws.send(JSON.stringify({
            type: type === "numberEval" ? "numberEval" : "chunk",
            content,
          }));
        }
      }
 
     ws.send(JSON.stringify({ type: "done" }));
 }
 
 async function handleDeepSeekFakeStream(ws, prompt, persona, type) {
    const systemPrompt =
     type === "writer"
     ? `You are a helpful assistant that writes like ${persona}. Write a story based on the prompt below in that author's writing style in about 100 words. Only return the story:\n\n`
     : persona
     ? `You are a helpful assistant that writes like ${persona}.`
     : "You are a helpful assistant.";
  
    const userPrompt =
      type === "evaluate"
        ? `Evaluate this chapter and return only a markdown-formatted evaluation. Be critical — point out inconsistencies and areas for improvement. Do not include any excess messages, keep each section to a sentence or two:\n\n${prompt}`
        : prompt;
  
    const numberPrompt =
      type === "numberEval"
        ? `Evaluate this chapter critically and return ONLY a number between 1 and 100 that reflects its quality. Do not be biased. Use the full range from 80–100, and do not include any explanations or formatting. Only return a number:\n\n${prompt}`
        : null;
  
        const actualPrompt =
        type === "writer"
          ? prompt // Use raw story idea
          : type === "numberEval"
          ? numberPrompt
          : userPrompt;
  
    try {
      const response = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: actualPrompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          },
        }
      );
  
      const fullText = response.data.choices?.[0]?.message?.content || "No response";
  
      for (let i = 0; i < fullText.length; i++) {
        ws.send(
          JSON.stringify({
            type: type === "numberEval" ? "numberEval" : "chunk",
            content: fullText[i],
          })
        );
        await new Promise((res) => setTimeout(res, 10));
      }
  
      ws.send(JSON.stringify({ type: "done" }));
    } catch (error) {
      console.error("DeepSeek streaming error:", error);
      ws.send(JSON.stringify({ type: "error", message: error.message }));
    }

    // Create a new agent object
    const newAgent = new Agent(persona, aiInstance);

    // Save the agent to the in-memory storage (you could use a database here)
    agents.push(newAgent);

    // Send a success response back to the frontend
    res.status(201).json({
        message: 'Agent created successfully',
        agent: newAgent,
    });
});

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route to index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// tells us what port the server is running on  
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export { app, server };

