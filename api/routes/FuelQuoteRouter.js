const express = require('express');
const router = express.Router();
const {validateFields, checkFieldStatus} = require('../controllers/FuelController')
const {priceCalculation} = require('../controllers/PricingController')
// const { db } = require('../db/firebase_util.js')

router.post('/get_price', async (req, res) => {
  //calculate price here and send it back to the client

  // validation call
  const { gallons, address, date} = req.body;

  //calculate price here and send it back to the client
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

  //calling the pricing function, I think I did it right
  price = priceCalculation(gallons, address);


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


module.exports = router;

