// test for user registration

const {getUserData, updateUserData} = require('../controllers/UserController');
const {getUsers} = require('../models/UserDB');


jest.mock('../models/UserDB');


it('should return user data by id', async () => {
    
  //mock database call
  getUsers.mockReturnValue(
    [
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
        "state": 'TX',
        "zipCode": "24680"
    },
    ]     
  );

  const expected = {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "addressLine1": "456 Elm St",
    "addressLine2": "Apt 2B",
    "city": "Somecity",
    "state": "TX",
    "zipCode": "67890"
  };
  
  const result = await getUserData(2);
  
  expect(result).toStrictEqual(expected);

})


it("throws error if user doesn't exist", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345"
      }
    ]
  );

  await expect(() => getUserData(2)).toThrow("User doesn't exist");
})


it("updates user's data", async () => {

  getUsers.mockReturnValue(
    [
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
    ]
  );

  const expected = {
    "id": 1,
    "firstName": "James",
    "lastName": "Doe",
    "addressLine1": "456 Main St",
    "addressLine2": null,
    "city": "Chatown",
    "state": "CA",
    "zipCode": "67891"
  };

  const argument = {
    "firstName": {value: "James"},
    "addressLine1": {value: "456 Main St"},
    "city": {value: "Chatown"},
    "zipCode": {value: "67891"}
  }

  const result = await updateUserData(1, argument);

  expect(result).toStrictEqual(expected);

})


it("updates user data on one field", async () => {

  getUsers.mockReturnValue(
    [
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
    ]
  );

  const expected = {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Greer",
    "addressLine1": "456 Elm St",
    "addressLine2": "Apt 2B",
    "city": "Somecity",
    "state": 'TX',
    "zipCode": "67890"
  };

  const argument = {
    "lastName": {value: "Greer"},
  }

  const result = await updateUserData(2, argument);
  
  expect(result).toStrictEqual(expected);
})

it("raises an error if user doesn't exist", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345"
    }
    ]
  );

  await expect(() => updateUserData(2, {})).
                        toThrow("User doesn't exist");
})

it("throws an error if user field is not valid", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345"
    }
    ] 
  );

  const argument = {
    "shirt size": {value: "large"}
  };

  await expect(() => updateUserData(1, argument)).toThrow("Invalid field: shirt size");

})