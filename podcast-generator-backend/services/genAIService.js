//services/genAIService.js
const { GoogleGenerativeAI } = require("@google/generative-ai"); // import the google generative ai library
require("dotenv").config(); // load environment variables from .env (for sensitive data like api keys)

// initialize the generative ai client with the api key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // use the api key from the .env file to authenticate


// configure the ai model (using 'gemini-1.5-flash' model)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // choose the specific ai model for podcast generation
  generationConfig: {
    temperature: 0.5, // control randomness of the response (lower is more predictable)
    topP: 0.95, // control diversity (limits the cumulative probability for the response)
    topK: 40, // limits the number of possible words the model can choose from
    maxOutputTokens: 5500, // maximum length of the generated response (tokens = chunks of words)
  },
});

// export the model's `generate` method so it can be used in the controller to generate podcast content
module.exports = model;
