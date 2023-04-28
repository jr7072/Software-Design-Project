const {getAuth} = require('../models/UserDB');

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

//Gets the user authentication data from the db
//Gets the user authentication data that matches the username from the get request
//If no matching username is found in db, then "Username is incorrect"
//If hash does not match, then "Password is incorrect"
const fetchUserAuthData = async (username, hash) => {
    
    user = await getAuth(username);

    if (user == -1) {
        throw new Error("Username is incorrect");
    }

    if (hash !== user.hash) {
        throw new Error("Password is incorrect");
    }

    return user;
}

module.exports = {
    hashCode,
    fetchUserAuthData
}
