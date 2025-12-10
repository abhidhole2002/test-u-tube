const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadVideo } = require("../controllers/uploadController");

router.post("/video", upload.single("video"), uploadVideo);

module.exports = router;
