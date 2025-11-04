const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

// POST /api/gemini/generate
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key is not configured' });
    }

    // Get the generative model
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Generate content
    const response = await model.generateContent(prompt);
    const text = response.response.text();

    res.json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({
      error: 'Failed to generate content',
      details: error.message,
    });
  }
});

module.exports = router;
