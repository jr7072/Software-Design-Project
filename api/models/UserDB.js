const { db } = require('../db/firebase_util.js');


const getUsers = async (id) => {  

    const usersRef = db.ref(`users/${id}`);
    const snapshot = await usersRef.once("value");
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
    return -1;
}


const createUser = (data) => {
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
