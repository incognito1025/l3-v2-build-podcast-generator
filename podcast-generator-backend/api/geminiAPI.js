// api/geminiAPI.js
// load environment variables from .env file
require("dotenv").config();

// import necessary package (replace with the actual package you intend to use)
const { GoogleGenerativeAI } = require("@google/generative-ai");

// use the api key stored in environment variables
const API_KEY = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY is loaded");

// initialize the googlegenerativeai client with the provided api key
const gGenAI = new GoogleGenerativeAI(API_KEY);

// function to create content based on user input (e.g., a prompt)
// api/geminiAPI.js
const createAIResponse = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error("API_KEY is undefined. Please check your .env file.");
    }

    const model = gGenAI.getGenerativeModel({
      model: "gemini-2.0-flash", // Changed from gemini-1.5-flash
    });

    // Changed from createContentStream to generateContent
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    throw error;
  }
};

const invokeGeminiAPI = async (userInput) => {
  try {
    const prompt = `Create content based on the following user input:\n\n"${userInput}"\n\nMake it informative and engaging for the user.`;
    const aiResponse = await createAIResponse(prompt);
    console.log("Gemini API response received");
    return aiResponse;
  } catch (error) {
    console.error("An error occurred while calling the Gemini API:", error);
    throw new Error("Gemini API call failed");
  }
};
// example usage: calling the api with user input (can be removed or modified as needed)
// const userInput = "describe the features of the new gemini api";
// invokeGeminiAPI(userInput);

// export the function so it can be used in other parts of the app
module.exports = {
  invokeGeminiAPI,
};
