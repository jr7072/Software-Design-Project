const { db } = require('../db/firebase_util.js');


const getUsers = async (id) => {  

    const userRef = db.ref(`users/${id}`);
    const snapshot = await userRef.once("value");
    const users = snapshot.val();
    return users;
}


const authDB = () => {  
    return [
        {
            "username": "john123",
            "hash": ""
        },
        {
            "username": "jane!",
            "hash": ""
        },
        {
            "username": "bobross",
            "hash": ""
        }
    ];
}


const updateUser = (id, data) => {
    userRef = db.ref(`users/${id}`);
    userRef.update(data);
}


const createUser = (data) => {
    //For Sam:
    //Need to make it so data is appended to the database when a new user registers
    return -1;
}


const deleteUser = (id) => {
    return -1;
}


module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    authDB
};
