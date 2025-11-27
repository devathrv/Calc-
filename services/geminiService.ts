import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askCuteMathHelper = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "Oopsie! I need an API Key to think! (Ask the dev to set process.env.API_KEY) 🌸";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: `You are a super cute, kawaii math assistant named "Calc-chan". 
        Your goal is to help solve math problems or explain calculations in a friendly, enthusiastic way.
        
        Rules:
        1. Use emojis liberally (✨, 🌸, 💖, 🍓, 🐱).
        2. Keep explanations simple and easy to understand.
        3. If the user asks a non-math question, gently guide them back to math but stay cute.
        4. If the input is a math expression, solve it and show the steps briefly.
        5. Keep responses concise (under 50 words usually) unless it's a complex word problem.
        `,
        temperature: 0.7,
      },
    });

    return response.text || "I couldn't quite understand that, sorry! 😿";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oh no! My brain got a little fuzzy. Please try again later! 🍥";
  }
};