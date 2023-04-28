const {getAuth, createUserAuth} = require('../models/UserDB');

//Generates hash code from a string
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const createNewUserAuth = async (username, password) => {

    if (username.toString().length < 8) {
        throw new Error("Username is too short. Must be at least 6 characters long.");
    }

    //check to see if password is long enough
    if (password.toString().length < 8) {
        throw new Error("Password is too short. Must be at least 8 characters long.");
    }

    const hash = hashCode(password); //generate hash
    var user = await createUserAuth(username, hash);

    if (user == -1) {
        throw new Error("Username is taken");
    }

    return user;
}

module.exports = {
    hashCode,
    createNewUserAuth
}
