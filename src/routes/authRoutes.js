const express = require("express");
const router = express.Router();
const { loginURL, googleCallback } = require("../controllers/authController");

router.get("/google", loginURL);
router.get("/google/callback", googleCallback);

module.exports = router;
