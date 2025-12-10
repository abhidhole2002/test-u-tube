const { google } = require("googleapis");
const fs = require("fs");
const Token = require("../models/Token");
const Video = require("../models/Video");
const oauth2Client = require("../config/googleOAuth");

exports.uploadVideo = async (req, res) => {
  try {
    const tokens = await Token.findOne();

    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: req.body.title,
          description: req.body.description,
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: fs.createReadStream(req.file.path),
      },
    });

    const videoId = response.data.id;

    await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoId,
    });

    res.json({
      message: "Video uploaded successfully",
      videoId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
