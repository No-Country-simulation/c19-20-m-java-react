let app;
try {
  app = require('./serverApp.js');
} catch (err) {
  app = (req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      error: "REAL VERCEL CRASH IN SERVERAPP.JS", 
      details: err.message, 
      stack: err.stack 
    }));
  };
}
module.exports = app;
