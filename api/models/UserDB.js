// database funtions
// we will build this out later


const getUsers = () => {  
    return [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "addressLine1": "123 Main St",
            "addressLine2": null,
            "city": "Anytown",
            "state": "CA",
            "zipCode": "12345"
        },
        {
            "id": 2,
            "firstName": "Jane",
            "lastName": "Smith",
            "addressLine1": "456 Elm St",
            "addressLine2": "Apt 2B",
            "city": "Somecity",
            "state": "TX",
            "zipCode": "67890"
        },
        {
            "id": 3,
            "firstName": "Bob",
            "lastName": "Johnson",
            "addressLine1": "789 Oak St",
            "addressLine2": null,
            "city": "Othercity",
            "state": "WA",
            "zipCode": "24680"
        },
        {
            "id": 4,
            "firstName": "Sarah",
            "lastName": "Lee",
            "addressLine1": "432 Park Ave",
            "addressLine2": "Suite 100",
            "city": "Bigcity",
            "state": "AL",
            "zipCode": "54321"
        },
        {
            "id": 5,
            "firstName": "Mike",
            "lastName": "Smith",
            "addressLine1": "321 Maple St",
            "addressLine2": "Unit 5",
            "city": "Smalltown",
            "state": "FL",
            "zipCode": "13579"
        }
    ];      
}


const updateUser = (id, data) => {
    return -1;
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
    deleteUser
};
