//server.js
// import the express app from `app.js`
const app = require("./app");

// import dotenv package and configure environment variables
require("dotenv").config();

// get the PORT variable from the environment or use default value
const PORT = process.env.PORT || 3030;

// start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});


// Add this temporary test code at the bottom of server.js
const { invokeGeminiAPI } = require('./api/geminiAPI');

// Self-executing async function to test the API
(async () => {
    try {
        const testResponse = await invokeGeminiAPI("Test message");
        console.log("API Test Success:", testResponse.slice(0, 100) + "...");
    } catch (error) {
        console.error("API Test Failed:", error.message);
    }
})();