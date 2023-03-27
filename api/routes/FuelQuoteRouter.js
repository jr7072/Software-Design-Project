const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Inside fuelQuote post request handler');
  const { gallons, address, deliveryDate, pricePerGallon } = req.body;

  console.log('User inputs:', req.body); 
  
  if (!gallons || !address || !deliveryDate || !pricePerGallon) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  res.json({ message: 'Received userInputs from frontend' });
});

router.get('/', (req, res) => {
  res.json(req.body);
});

module.exports = router;
