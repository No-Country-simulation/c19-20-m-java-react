let app;
try {
  app = require('./server.js');
} catch (err) {
  const express = require('express');
  app = express();
  app.all('*', (req, res) => {
    res.status(500).json({ 
      error: "CRASH IN SERVER.JS", 
      details: err.message, 
      stack: err.stack 
    });
  });
}
module.exports = app;
