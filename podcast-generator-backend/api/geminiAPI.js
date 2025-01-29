// api/geminiAPI.js
// load environment variables from .env file
require("dotenv").config();

// import necessary package (replace with the actual package you intend to use)
const { GoogleGenerativeAI } = require("@google/generative-ai");

// use the api key stored in environment variables
const API_KEY = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

// initialize the googlegenerativeai client with the provided api key
const gGenAI = new GoogleGenerativeAI(API_KEY);

// function to create content based on user input (e.g., a prompt)
const createAIResponse = async (prompt) => {
  try {
    // check if apikey is defined, otherwise throw an error
    if (!API_KEY) {
      throw new Error("api_key is undefined. please check your .env file.");
    }

    // get the generative model (replace 'gemini-1.5-flash' with the appropriate model)
    const model = gGenAI.getGenerativeModel({
      model: "gemini-1.5-flash", // use the correct model version
      systemInstruction:
        "you are a content generator. you will take user input and return a detailed response.",
    });

    // make the api call to create content based on the user input (prompt)
    const result = await model.createContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7, // adjust temperature to control randomness of the response
      },
    });

    // collect the content created by the model and return it
    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
    }

    return fullResponse;
  } catch (error) {
    console.error("error generating ai response:", error.message);
    throw error; // propagate the error for handling in the controller
  }
};

// function to call the gemini api with a user-provided input
const invokeGeminiAPI = async (userInput) => {
  try {
    // construct a prompt to send to the gemini api
    const prompt = `create content based on the following user input:\n\n"${userInput}"\n\nmake it informative and engaging for the user.`;

    // call the function to create the response
    const aiResponse = await createAIResponse(prompt);

    console.log("gemini api response:", aiResponse);
    return aiResponse;
  } catch (error) {
    console.error("an error occurred while calling the gemini api:", error);
    throw new Error("gemini api call failed");
  }
};

// example usage: calling the api with user input (can be removed or modified as needed)
// const userInput = "describe the features of the new gemini api";
// invokeGeminiAPI(userInput);

// export the function so it can be used in other parts of the app
module.exports = {
  invokeGeminiAPI,
};
