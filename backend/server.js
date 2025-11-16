const http = require('http');
const { handleCalculate, handleNotFound } = require('./routes');

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/calculate' && req.method === 'POST') {
    await handleCalculate(req, res);
  } else {
    handleNotFound(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`POST /api/calculate - Real Estate CAGR Calculator`);
});