// server.js
import express from "express";
import cors from "cors";

        
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//ChatGPT Agent
import { config } from "dotenv";
import { OpenAI } from "openai";

// Load environment variables
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in .env
});

async function runChatGPT(systemContent, userContent) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Write a sentence about recursion in programming." },
            ],
        });

        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching completion:", error);
    }
}


