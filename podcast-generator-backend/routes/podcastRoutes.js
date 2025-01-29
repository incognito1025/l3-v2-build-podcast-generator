//routes/podcastRoutes.js
const express = require("express");
const router = express.Router();

router.get("/generate-podcast", (req, res) => {
    res.json({ message: "Podcast generation route works!" });
});

module.exports = router;