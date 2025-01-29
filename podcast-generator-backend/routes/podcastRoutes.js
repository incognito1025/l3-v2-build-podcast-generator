//routes/podcastRoutes.js
const express = require("express");
const router = express.Router();

router.get("/generate-podcast", (req, res) => {
  res.json({ message: "Podcast generation route works!" });
});

module.exports = router;

//This route is a basic test endpoint confirming that the podcast route is functional. It serves as a placeholder for future podcast generation logic.
