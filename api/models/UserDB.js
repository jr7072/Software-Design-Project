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
    for (var i = 1; i < auths.length; i++) {
        if (auths[i].username == username) {
            //if a match is found, save it in result
            result = auths[i];
        }
    }

    return result;
}

const createUserAuth = async (username, hash) => {

    const authRef = db.ref("Auth");
    const snapshot = await authRef.once("value");
    const auths = snapshot.val();

    result = {"hash": hash, "username": username};

    //if username is already taken, return -1
    var authLength = Object.keys(auths).length;
    for (var i = 1; i < authLength + 1; i++) {
        if (auths[i].username == username) {
            return -1;
        }
    }

    //if username not taken, add to database
    //generate new key based off length of Auth object + 1
    var key = authLength + 1;
    key = key.toString();
    //adds new entry with key and result as the value
    var newAuthRef = authRef.child(key);
    newAuthRef.set(result);

    return result;
}

const updateUser = (id, data) => {
    userRef = db.ref(`users/${id}`);
    userRef.update(data);
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
    getAuth,
    createUserAuth
};
