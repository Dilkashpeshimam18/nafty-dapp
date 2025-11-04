// Backend API endpoint for Gemini
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getResponseFromGemini = async (input) => {
  try {
    const response = await fetch(`${API_URL}/api/gemini/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw err;
  }
};
