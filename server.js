require('dotenv').config();            // loads values from .env
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());                          // lets the server read JSON sent by the browser
app.use(express.urlencoded({ extended: true }));  // lets the server read HTML form data
app.use(express.static(path.join(__dirname, 'public'))); // serves files in /public

// A test route to confirm the server works
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SubTrack server is running' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SubTrack running at http://localhost:${PORT}`);
  });
});