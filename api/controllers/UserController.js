// user functions
const {getUsers} = require('../models/UserDB');


const getUserData = (id) => {
    user = getUsers(id)

    if (!user){
        throw new Error("User doesn't exist");
    }

    return user;
}


const updateUserData = (id, data) => {
    
    users = getUsers() 
    user_data = users.filter(users => users.id == id);

    if (user_data.length == 0) {
        throw new Error("User doesn't exist");
    }

    user_object = user_data[0];
  
    for (const [key, value] of Object.entries(data)){
        
        if (!user_object.hasOwnProperty(key)){
            throw new Error(`Invalid field: ${key}`);
        }

        user_object[key] = value;
    }

    return user_object;
}

const validateFields = (proposedData) => {
    
    // define rules here
    const rules = {
        'firstName': {required: true, length: [0, 50]},
        'lastName': {required: true, length: [0, 50]},
        'addressLine1': {required: true, length: [0, 100]},
        'addressLine2': {required: false, length: [0, 100]},
        'city': {required: true, length: [0, 100]},
        'state': {required: true, length: [2, 2]},
        'zipCode': {required: true, length: [5, 9]}
    }

    const results = {}

    for (const [field, value] of Object.entries(proposedData)) {

        const required = rules[field].required;
        const [lower, upper] = rules[field].length;
        const result_data = {valid: true, message: 'accepted'}

        if (required && value === ""){
            result_data.valid = false
            result_data.message = "required"
        }

        if (value){
            
            const value_length = value.length

            if (value_length < lower || value_length > upper) {
                result_data.valid = false;
                result_data.message = 
                    `expected input length to be between ${lower} and ${upper}`;
            }
        }

        results[field] = result_data
    }

    return results
}


const checkFieldStatus = (fieldResults) => {
    
    let status = true

    for (const fieldStatus of Object.values(fieldResults)){

        const valid = fieldStatus.valid;

        if (!valid){
            status = false;
        }

    }

    return status
}

module.exports = {
    getUserData,
    updateUserData,
    validateFields,
    checkFieldStatus
}
