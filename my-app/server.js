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
//import OpenAI from "openai";

dotenv.config(); // Load environment variables

//ports, express() to initialize our backend for calls to be made. port to launch our backend and keep it up
const app = express();
const port = 5001;

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

    try {
         const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions", //link to retrieve api 
            {
                //specifications for the deepseek model - tokens, model, messages, etc
                model: "deepseek-chat", 
                messages: [{ role: "user", content: prompt }], 
                max_tokens: 1500,
                temperature: 1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    // greyed-out for now, until servers are back-up
                    //"Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`, 
                },
            }
        ); 

     
    
        
        res.json(response.data);

    } 
    //error catching to throw an error in the console incase there's an issue for further debugging.
     catch (error) {
        console.error("DeepSeek API Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    } 
});

// tells us what port the server is running on 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
