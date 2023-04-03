const express = require('express');
const router = express.Router();

//internal modules
const {hashCode, fetchUserAuthData} = require('../controllers/RegistrationController');

// middleware here

//routes here

router.get('/:register', (req, res) => {
    try {

        const username = req.params.username;
        const password = req.params.password;
        const data = fetchUserAuthData(username, password);

        // NEEDS TO CHECK IF USER AUTH IS CORRECT

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