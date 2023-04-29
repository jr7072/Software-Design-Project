
const express = require('express');
const router = express.Router();
const { db } = require('../db/firebase_util.js');
const { getUserFuelHistoryIds } = require('../controllers/UserController');

router.get('/:id', async (req, res) => {
  
  const id = req.params.id;

  try {

    const fuel_ids = await getUserFuelHistoryIds(id);

    console.log(fuel_ids)
    
    // get the fuel quotes bases on fuel ids
    const fuel_ref = db.ref('/fuel');
    const fuel_snapshot = await fuel_ref.once('value');
    const fuel_data = fuel_snapshot.val();

    const fuelQuotes = [];



    for (const property in fuel_data) {

      if (fuel_ids.includes(property)) {
        fuelQuotes.push(fuel_data[property]);
      }

    }

    json_data = JSON.stringify(fuelQuotes);

    res.status(200).send(json_data);

  } catch (e) {
    console.log(e);
  }

})


module.exports = router;



