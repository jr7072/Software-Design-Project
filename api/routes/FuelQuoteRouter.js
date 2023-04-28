const express = require('express');
const router = express.Router();
const {validateFields, checkFieldStatus} = require('../controllers/FuelController')
const {
  getUserFuelHistoryIds,
  updateUserFuelHistory,
} = require('../controllers/UserController');

const { v1 } = require('uuid');

const {priceCalculation} = require('../controllers/PricingController')
const { db } = require('../db/firebase_util.js')

router.post('/get_price/:id', async (req, res) => {
  //calculate price here and send it back to the client

  const id = req.params.id;

  // validation call
  const { gallons, address, date} = req.body;

  if (!gallons || !address) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // get fuel history
  const fuel_ids = await getUserFuelHistoryIds(id);

  const price = priceCalculation(gallons, address, fuel_ids);

  const data = {
    price: price
  } 

  const json_data = JSON.stringify(data);

  res.status(200).send(json_data);

});


router.post('/:id', async (req, res) => {
  // use this function to generate an uuid for the fuel quote, get the user fuel quote history using the route
  // and update the user with the new fuel quote list and create a new fuel quote entry with the same id


  // validation call
  const { gallons, address, date, price } = req.body;

 
  if (!gallons || !address || !date || !price) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const id = req.params.id;
    let data = req.body;

    // test data
    const dataResults = validateFields(data);
    // check data
    const passed = checkFieldStatus(dataResults);

    if (!passed){
        // if not passed send test results
        res.status(400).send(dataResults);
        return
    }

    data.fuel_id = v1();

    // update user fuel quote history
    const fuel_ids = await getUserFuelHistoryIds(id);

    console.log(fuel_ids);

    fuel_ids.push(data.fuel_id);

    // update the user history
    await updateUserFuelHistory(id, fuel_ids);

    // create new fuel quote entry
    const fuelRef = db.ref(`fuel/${data.fuel_id}`);
    await fuelRef.set(data);
    
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


module.exports = router;

