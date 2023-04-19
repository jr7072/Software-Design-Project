
const {authDB} = require('../models/UserDB');

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const fetchUserAuthData = (username, password) => {

    console.log(username);
    console.log(password);
    
    users = authDB();
    user_data = users.filter(users => users.username == username);

    if (user_data.length == 0) {
        throw new Error("Database Entry Error");
    }

    user_object = user_data[0]; //user_object.username or user_object.password
    console.log(user_data);

    return user_object;
}

const usernameNotTaken = (username) => {
    
    users = authDB();
    user_data = users.filter(users => users.username == username);

    if (user_data.length != 0) {
        throw new Error("User already exists");
    }

    return true;
}

module.exports = {
    hashCode,
    fetchUserAuthData,
    usernameNotTaken
}