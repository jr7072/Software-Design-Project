const express = require('express');
const router = express.Router();

//internal modules
const {hashCode, fetchUserAuthData} = require('../controllers/LoginController');

// middleware here

//routes here

router.get('/login', async (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;

        if (username == undefined || password == undefined) {
            throw new Error("Invalid params");
        }
        
        const data = await fetchUserAuthData(username, password);

        const json_data = JSON.stringify(data);
        res.status(200).send(json_data);

    } catch (error) {

        const data = {
            error: error.message
        }
        const json_data = JSON.stringify(data);
        res.status(400).send(json_data);
    }
})

module.exports = router;