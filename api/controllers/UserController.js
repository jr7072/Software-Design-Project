// user functions
const {
    getUsers,
    updateUser,
    getUserFuelHistory
} = require('../models/UserDB');


const getUserData = async (id) => {
    
    user = await getUsers(id)

    if (!user){
        throw new Error("User doesn't exist");
    }

    delete user.fuelQuote;

    return user;
}

const getUserFuelHistoryIds = async (id) => {

    fuelHistoryids = getUserFuelHistory(id);

    delete fuelHistoryids.empty

    return Object.values(fuelHistoryids) 
}

const updateUserFuelHistory = async (id, data) => {

    user = await getUsers(id);

    if (!user) {
        throw new Error("User doesn't exist");
    }

    user.fuelQuote = data;

    await updateUser(id, user);
}

const updateUserData = async (id, data) => {
    
    user = await getUsers(id);

    if (!user) {
        throw new Error("User doesn't exist");
    }
  
    for (const [key, value] of Object.entries(data)){
        
        if (!user.hasOwnProperty(key)){
            throw new Error(`Invalid field: ${key}`);
        }

        user[key] = value;
    }


    await updateUser(id, user);

    delete user.fuelQuote;

    return user;
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
    getUserFuelHistoryIds,
    updateUserData,
    validateFields,
    checkFieldStatus,
    updateUserFuelHistory
}
