const express = require('express');
const router = express.Router();

//internal modules
const {getUserData, updateUserData, validateFields, checkFieldStatus} = require('../controllers/UserController');
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

        // get data
        const id = req.params.id;
        const data = req.body;
        
        // test data
        const dataResults = validateFields(data);
        
        // check data
        const passed = checkFieldStatus(dataResults);

        if (!passed){
            // if not passed send test results
            res.status(400).send(dataResults);
            return
        }

        // update if passed
        const updatedData = updateUserData(id, data);
        const json_data = JSON.stringify(updatedData);
        res.status(204).send(json_data); 

    } catch (error) {

        const data = {
            error: error.message
        }
        const json_data = JSON.stringify(data);
        res.status(400).send(json_data);
        
    }
})


module.exports = router;
