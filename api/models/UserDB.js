const { v1 } = require('uuid');
const { db } = require('../db/firebase_util.js');


const getUsers = async (id) => {  

    const userRef = db.ref(`users/${id}`);
    const snapshot = await userRef.once("value");
    const users = snapshot.val();
    return users;
}


const getAuth = async (username) => {
    //retrieves Auth object from db
    const authRef = db.ref("Auth");
    const snapshot = await authRef.once("value");
    const auths = snapshot.val();

    //searches through Auth object for user that matches username parameter
    result = -1;
    for (const key in auths) {
        if (auths[key].username == username) {
            //if a match is found, save it in result
            result = auths[key];
            result.id = key;
        }
    }

    return result;
}

const createUser = async (key) => {

    const userRef = db.ref("users");
    const snapshot = await userRef.once("value");
    const users = snapshot.val();

    const data = {
        'firstName': "",
        'lastName': "",
        'addressLine1': "",
        'addressLine2': "",
        'city': "",
        'state': "",
        'zipCode': ""
    }

    var newUserRef = userRef.child(key);
    newUserRef.set(data);

    return -1;
}

const createUserAuth = async (username, hash) => {

    const authRef = db.ref("Auth");
    const snapshot = await authRef.once("value");
    const auths = snapshot.val();

    result = {"hash": hash, "username": username};

    //if username is already taken, return -1
    var authLength = Object.keys(auths).length;
    for (const key in auths) {
        if (auths[key].username == username) {
            return -1;
        }
    }

    //if username not taken, add to database
    //generate new key based off length of Auth object + 1
    var key = v1();
    //adds new entry with key and result as the value
    var newAuthRef = authRef.child(key);
    newAuthRef.set(result);
    createUser(key);

    result.id = key;

    return result;
}

const updateUser = (id, data) => {
    userRef = db.ref(`users/${id}`);
    userRef.update(data);
}

const deleteUser = (id) => {
    return -1;
}


module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    getAuth,
    createUserAuth
};
