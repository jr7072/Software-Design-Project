
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
    
    users = authDB();
    user_data = users.filter(users => users.username == username);

    if (user_data.length == 0) {
        throw new Error("User doesn't exist");
    }

    user_object = user_data[0]; //user_object.username or user_object.hash
    
    if (password !== user_object.hash) {
        throw new Error("Wrong Password");
    }

    return user_object;
}

module.exports = {
    hashCode,
    fetchUserAuthData
}