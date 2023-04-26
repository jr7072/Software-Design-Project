// const express = require('express');
// const router = express.Router();
// const validate = require('../controllers/FuelController')
// const { db } = require('../db/firebase_util.js');

// router.post('/', (req, res) => {
//   console.log('Inside fuelQuote post request handler');
//   const { gallons, address, date, price } = req.body;

//   console.log('User inputs:', req.body);
//   // ///
//   // const errors = validate(gallons, address, date);
//   // if (Object.keys(errors).length > 0) {
//   //   res.status(400).json({ errors });
//   //   return;
//   // }
//   // ///
 
//   if (!gallons || !address || !date || !price) {
//     res.status(400).json({ error: 'Missing required fields' });
//     return;
//   }

//   res.json({ message: 'Received userInputs from frontend' });
// });

// router.get('/', (req, res) => {
//   res.json(req.body);
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const validate = require('../controllers/FuelController')
const { db } = require('../db/firebase_util.js');


router.post('/', async (req, res) => {
  console.log('Inside fuelQuote post request handler');
  const { gallons, address, date, price } = req.body;

  console.log('User inputs:', req.body);

  if (!gallons || !address || !date || !price) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const docRef = await db.collection('fuel').add({
      gallons,
      address,
      date,
      price
    });
    console.log('Document written with ID: ', docRef.id);
    res.json({ message: 'Received userInputs from frontend and added to Firebase' });
  } catch (error) {
    console.error('Error adding document: ', error);
    res.status(500).json({ error: 'Error adding document to Firebase' });
  }
});


router.get('/', (req, res) => {
  res.json(req.body);
});


module.exports = router;
