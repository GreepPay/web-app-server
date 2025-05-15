"use strict";

const express = require("express");
const axios = require("axios");
const isBot = require("isbot");

// Load environment variables
require("dotenv").config();

// Load path
const path = require("path");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../app/dist")));

// Middleware to detect bots
app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"] || "";
  if (isBot.isbot(userAgent)) {
    req.isBot = true; // Add a flag to the request object
  } else {
    req.isBot = false;
  }
  next();
});

app.get("/*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
