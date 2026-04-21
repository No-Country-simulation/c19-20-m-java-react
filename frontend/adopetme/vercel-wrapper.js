let app;
try {
  app = require('./server.js');
} catch (err) {
  console.error("Vercel Wrapper caught an exception:", err);
  app = (req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      error: "CRASH IN SERVER.JS", 
      details: err.message, 
      stack: err.stack 
    }));
  };
}
module.exports = app;
