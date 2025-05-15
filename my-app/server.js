/* Imports:
 -Node/express - Our backend functions to be able to make API calls and other necessary backend tools
 CORS - allows our front-end to access by front-end applciations on different origins
 axios - similar to CORS allows react to access API requests
 dotenv - to use .env files for retrieving keys
 */

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
 import { WebSocketServer } from 'ws';
 import path from "path";
 import { fileURLToPath } from "url";

 dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
 const app = express();
 const port = 5001;
 
 app.use(cors());
 app.use(express.json());
 
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
 
 const server = app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
 });

 app.post('/api/debate', async (req, res) => {
  try {
      const { proposals, persona } = req.body;

      if (!Array.isArray(proposals) || proposals.length === 0 || !persona) {
          return res.status(400).json({ error: 'Missing proposals array or persona' });
      }

      const systemPrompt = `You are a writing assistant who speaks like ${persona}. You are participating in a story-writing debate.`;

      const userPrompt = `
Here are several story proposals:

${proposals.map((p, i) => `Proposal ${i + 1}:\n${p}`).join("\n\n")}

Debate the strengths and weaknesses of each proposal. Focus on tone, creativity, and alignment with previous story context. Be critical but constructive.
`;

      const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
          ],
      });

      const debateResponse = completion.choices?.[0]?.message?.content?.trim();

      res.json({ message: debateResponse });

  } catch (error) {
      console.error("Debate error:", error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch debate response' });
  }
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
 

  
  // ✅ Serve the built frontend (after all API and WebSocket setup)
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
 
 export { app, server };
 