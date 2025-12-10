const oauth2Client = require("../config/googleOAuth");
const Token = require("../models/Token");
const { google } = require("googleapis");

exports.loginURL = async (req, res) => {
    console.log("helllo")
  const scopes = ["https://www.googleapis.com/auth/youtube.upload"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });

  res.json({ url });
};

exports.googleCallback = async (req, res) => {

    console.log("testing",req.body)
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);

  await Token.deleteMany({});
  await Token.create({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  });

  res.send("Google Auth Successful. Tokens Saved.");
};
