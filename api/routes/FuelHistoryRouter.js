
const express = require('express');
const router = express.Router();
const { db } = require('../db/firebase_util.js');


export default async (req, res) => {
  try {
    const snapshot = await db.ref('fuelquote').once('value');
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch quote history:', error);
    res.status(500).json({ message: 'Failed to fetch quote history' });
  }
};


module.exports = router;




// const express = require('express');
// const router = express.Router();
// const { db } = require('../db/firebase_util.js');



// let historyRecord = [{
//     gallonsRequested: 5,
//     deliveryAddress: "1313 Main st 77093, Houston Texas",
//     deliveryDate: "03/15/2023",
//     suggestedPricePerGallon: 5,
//     totalAmountDue: 25}]

// function getFuelQuoteHistory(req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(historyRecord);
// }

// router.get('/', getFuelQuoteHistory)


// module.exports = router;

