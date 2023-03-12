// user functions
const {getUsers} = require('../models/UserDB');


const getUserData = (id) => {
    users = getUsers()
    user_data = users.filter(users => users.id == id);
    return user_data;
}


const updateUserData = (id, data) => {
    users = getUsers() 
    user_data = users.filter(users => users.id == id);

    if (user_data.length == 0) {
        throw new Error("User doesn't exist");
    }

    user_data[0].fullName = data.fullName;
    user_data[0].addressLine1 = data.addressLine1;
    user_data[0].addressLine2 = data.addressLine2;
    user_data[0].city = data.city;
    user_data[0].zipCode = data.zipCode;

    return user_data[0];
}

module.exports = {
    getUserData,
    updateUserData,
}
