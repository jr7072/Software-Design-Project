const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig'); //

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

router.post('/', (req, res) => {
  console.log('Inside fuelQuote post request handler');
  const { gallons, address, pricePerGallon } = req.body;
  const email = req.body.email;
  const deliveryDate = new Date(req.body.deliveryDate);
  const deliveryDateStr = deliveryDate.toISOString().split('T')[0];

  if (!email || !gallons || !address || !deliveryDateStr || !pricePerGallon) {
    res.status(400).json({ error: 'Missing required fields' });
    console.log('missing a variable');
    return;
  }

  try {
    const newFuelQuoteRef = db.ref('fuelQuotes').push();
    newFuelQuoteRef.set({
      email,
      gallons,
      address,
      deliveryDate: deliveryDateStr,
      pricePerGallon
    });
    console.log(`Fuel quote inserted into Realtime Database with key: ${newFuelQuoteRef.key}`);
    res.status(200).json({ message: 'Fuel quote inserted into database' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', (req, res) => {
  res.json(req.body);
});

module.exports = router;

