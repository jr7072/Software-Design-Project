const express = require('express');
const router = express.Router();


let historyRecord = [{
    gallonsRequested: 5,
    deliveryAddress: "1313 Main st 77093, Houston Texas",
    deliveryDate: "03/15/2023",
    suggestedPricePerGallon: 5,
    totalAmountDue: 25}]

function getFuelQuoteHistory(req, res) {
    res.setHeader('Content-Type', 'application/json'); 
    res.status(200).json(historyRecord);
}

router.get('/', getFuelQuoteHistory)


module.exports = router;