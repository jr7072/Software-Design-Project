// user functions
const {getUsers} = require('../models/UserDB');


const getUserData = (id) => {
    users = getUsers()
    user_data = users.filter(users => users.id == id);

    if (user_data.length == 0){
        throw new Error("User doesn't exist");
    }

    return user_data[0];
}


const updateUserData = (id, data) => {
    
    users = getUsers() 
    user_data = users.filter(users => users.id == id);

    if (user_data.length == 0) {
        throw new Error("User doesn't exist");
    }

    user_object = user_data[0];
  
    for (const [key, metadata] of Object.entries(data)){
        
        if (!user_object.hasOwnProperty(key)){
            throw new Error(`Invalid field: ${key}`);
        }

        user_object[key] = metadata.value;
    }

    return user_object;
}

module.exports = {
    getUserData,
    updateUserData,
}
