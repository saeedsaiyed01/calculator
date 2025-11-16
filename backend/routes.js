const { calculateRealEstateCAGR } = require('./calculator');

function validateInputs(inputs) {
  const requiredFields = [
    'initialPrice', 'investmentPeriod', 'yearlyRent', 'rentIncrease',
    'propertyTax', 'maintenance', 'finalPrice', 'loanAmount',
    'loanTenureCompleted', 'totalLoanTenure', 'interestRate'
  ];

  for (const field of requiredFields) {
    if (!(field in inputs)) {
      throw new Error(`Missing required field: ${field}`);
    }
    const value = parseFloat(inputs[field]);
    if (isNaN(value) || value < 0) {
      throw new Error(`Invalid value for ${field}: must be a non-negative number`);
    }
  }

  return true;
}

function handleCalculate(req, res) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const inputs = JSON.parse(body);
        validateInputs(inputs);
        const results = calculateRealEstateCAGR(inputs);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
        resolve();
      } catch (err) {
        const statusCode = err.message.includes('Missing') || err.message.includes('Invalid') ? 400 : 500;
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        resolve();
      }
    });

    req.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server error: ' + err.message }));
      resolve();
    });
  });
}

function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}

module.exports = { handleCalculate, handleNotFound };