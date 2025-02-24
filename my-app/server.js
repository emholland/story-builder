import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // Load environment variables

//ports 
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("testing!");
});

// DeepSeek API Route
app.post("/api/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions", // ✅ Corrected endpoint
            {
                model: "deepseek-chat", // ✅ Ensure this is the correct model (check DeepSeek docs)
                messages: [{ role: "user", content: prompt }], // ✅ DeepSeek expects "messages"
                max_tokens: 1500,
                temperature: 1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`, // ✅ Ensure API key is valid
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("DeepSeek API Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
