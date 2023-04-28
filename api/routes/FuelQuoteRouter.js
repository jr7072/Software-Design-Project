// const express = require('express');
// const router = express.Router();
// const validate = require('../controllers/FuelController')
// const { db } = require('../db/firebase_util.js');


// router.post('/:fuelId', async (req, res) => {
//   console.log('Inside fuelQuote post request handler');
//   const { gallons, address, date, price } = req.body;
//   const fuelId = req.params.fuelId;
//   console.log('User inputs:', req.body);

//   if (!gallons || !address || !date || !price) {
//     res.status(400).json({ error: 'Missing required fields' });
//     return;
//   }

//   try {
//     const docRef = await db.ref(`fuel/${fuelId}`).push({
//       gallons,
//       address,
//       date,
//       price
//     });
//     console.log('Document written with ID: ', docRef.id);
//     res.json({ message: 'Received userInputs from frontend and added to Firebase' });
//   } catch (error) {
//     console.error('Error adding document: ', error);
//     res.status(500).json({ error: 'Error adding document to Firebase' });
//   }
// });


// router.get('/', (req, res) => {
//   res.json(req.body);
// });


// module.exports = router;


const express = require('express');
const router = express.Router();
const {validateFields, checkFieldStatus} = require('../controllers/FuelController')
// const { db } = require('../db/firebase_util.js');

// routes here
router.get('/:id', (req, res) => {
  const id = req.params.id;
  //database call
  upload_fuel_data(id).then((data => {
      const json_data = JSON.stringify(data);
      res.status(200).send(json_data);
  })).catch(error => {
      const data = {
          error: error.message
      }
      const json_data = JSON.stringify(data);
      res.status(400).send(json_data);
  });

})

router.post('/:id', async (req, res) => {
  // validation call
  const { gallons, address, date, price } = req.body;
 
  if (!gallons || !address || !date || !price) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const id = req.params.id;
    const data = req.body;

    // test data
    const dataResults = validateFields(data);
    // check data
    const passed = checkFieldStatus(dataResults);

    if (!passed){
        // if not passed send test results
        res.status(400).send(dataResults);
        return
    }

    const json_data = JSON.stringify(data);
    res.status(200).send(json_data);

  }catch(error){
    const data = {
      error: error.message
    }
    const json_data = JSON.stringify(data);
    res.status(400).send(json_data);
    }
});


// router.get('/', (req, res) => {
//   res.json(req.body);
// });


module.exports = router;