const express = require('express');
const router = express.Router();

//internal modules
const {hashCode, usernameNotTaken, fetchUserAuthData} = require('../controllers/RegistrationController');
const {createUser} = require('../models/UserDB');

// middleware here

//routes here

router.get('/:register', (req, res) => {
    try {

        //Input given by the user
        const username = req.params.username;
        const password = req.params.password;

        //Check to see if username is already taken
            //If taken, throw exception
        if (usernameNotTaken(username)) {
            var data = {
                "username": username,
                "hash": hashCode(password) //Convert password to hash
            };
            createUser(data); //Add user and hash to database as a new entry
        }

        const data = fetchUserAuthData(username, password); //If error thrown, then "Database Entry Error"

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