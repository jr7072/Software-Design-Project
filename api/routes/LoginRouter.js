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
        const hash = hashCode(password); //generate hash code
        const data = await fetchUserAuthData(username, hash);

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