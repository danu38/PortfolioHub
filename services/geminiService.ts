import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // In a real app, you might want to handle key missing more gracefully in UI
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const enhanceText = async (text: string, type: 'bio' | 'job' | 'project'): Promise<string> => {
  if (!text || text.length < 5) return text;

  const ai = getAiClient();
  
  let prompt = "";
  
  switch (type) {
    case 'bio':
      prompt = `Rewrite the following professional bio to be more engaging, concise, and professional. Keep it under 80 words. Text: "${text}"`;
      break;
    case 'job':
      prompt = `Rewrite the following job description to highlight achievements and use action verbs. Keep it professional and bulleted if possible (use •). Text: "${text}"`;
      break;
    case 'project':
      prompt = `Rewrite this project description to be punchy and highlight the problem solved and tech used. Text: "${text}"`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text; // Fallback to original text on error
  }
};

export const generateSkillsFromBio = async (bio: string): Promise<string[]> => {
  const ai = getAiClient();
  const prompt = `Extract a list of professional hard and soft skills from this bio. Return only the skills as a JSON array of strings. If no clear skills are found, return an empty array. Bio: "${bio}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};