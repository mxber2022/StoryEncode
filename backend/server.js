const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
  baseURL: 'https://api.anthropic.com/v1/',
});

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid messages array' });
    }

    // Claude expects a single prompt string, but for compatibility, join user/assistant turns
    const prompt = messages.map(m => (m.type === 'user' ? `Human: ${m.content}` : `Assistant: ${m.content}`)).join('\n') + '\nAssistant:';

    const response = await openai.chat.completions.create({
      model: 'claude-3-opus-20240229',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const aiMessage = response.choices?.[0]?.message?.content || '';
    res.json({ content: aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate completion' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
}); 