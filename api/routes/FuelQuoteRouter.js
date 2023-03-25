const express = require('express');
const router = express.Router();
const { validateFields, checkFieldStatus } = require('../controllers/UserController');

// Example fuel quote database
const fuelQuotesDB = [];

// GET route for retrieving fuel quote data based on user ID
router.get('/:id/fuel-quotes', (req, res) => {
  try {
    const id = req.params.id;
    const userQuotes = fuelQuotesDB.filter(quote => quote.userId === id);
    const json_data = JSON.stringify(userQuotes);
    res.status(200).send(json_data);
  } catch (error) {
    const data = {
      error: error.message
    }
    const json_data = JSON.stringify(data);
    res.status(400).send(json_data);
  }
});

// POST route for creating a new fuel quote
router.post('/:id/fuel-quotes', (req, res) => {
  try {
    // Get data from request body
    const { gallons, address, date } = req.body;
    
    // Validate data
    const dataResults = validateFields(req.body);
    const passed = checkFieldStatus(dataResults);

    if (!passed) {
      res.status(400).send(dataResults);
      return;
    }

    // Store data in database
    const quote = {
      userId: req.params.id,
      gallons,
      address,
      date
    };
    fuelQuotesDB.push(quote);

    // Send response
    const json_data = JSON.stringify(quote);
    res.status(201).send(json_data);
  } catch (error) {
    const data = {
      error: error.message
    }
    const json_data = JSON.stringify(data);
    res.status(400).send(json_data);
  }
});

module.exports = router;
