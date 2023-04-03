const express = require('express');
const connection = require('../connection');
const router = express.Router();

function getFuelQuoteHistory(req, res) {
    const email = req.query.email;
    connection.query(`SELECT gallons, address, deliveryDate, pricePerGallon, gallons * pricePerGallon AS totalAmount FROM fuelQuotes WHERE email = '${email}'`, function(error, historyRecord, fields) {
        
        if (error) {
            // console.error(error)
            res.status(500).json({error: 'Failed to retrieve fuel quote history'})
        } 
        res.setHeader('Content-Type', 'application/json'); // set the Content-Type header explicitly
        res.status(200).json(historyRecord);
    });
}


router.get('/', getFuelQuoteHistory)


module.exports = router;