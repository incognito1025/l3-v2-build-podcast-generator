//import/require server app from app.js
const app = require("./app.js");

//import/require dotenv package and configure it to use environmental variables (process.env) on PORT variable in .env file
require("dotenv").config()

//Get the PORT variable from the environment (defined in .env file)
const PORT = process.env.PORT;

//Make the server app listen on defiend port for any incoming request from app.js
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});