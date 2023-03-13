const express = require('express');
const router = express.Router();

//internal modules
const {getUserData, updateUserData} = require('../controllers/UserController');
const {
    updateUser,
    createUser,
    deleteUser
} = require('../models/UserDB');

// middleware here


// routes here
router.get('/:id', (req, res) => {
    try {

        const id = req.params.id;
        const data = getUserData(id);
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


router.put('/:id', (req, res) => {
    try {

        const id = req.params.id;
        const data = req.body;
        const updated_data = updateUserData(id, data);
        // call a database update here
        const json_data = JSON.stringify(updated_data);
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
