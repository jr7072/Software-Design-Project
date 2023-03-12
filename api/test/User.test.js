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
        "fullName": "John Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "zipCode": "12345"
      },
      {
        "id": 2,
        "fullName": "Jane Smith",
        "addressLine1": "456 Elm St",
        "addressLine2": "Apt 2B",
        "city": "Somecity",
        "zipCode": "67890"
      },
      {
        "id": 3,
        "fullName": "Bob Johnson",
        "addressLine1": "789 Oak St",
        "addressLine2": null,
        "city": "Othercity",
        "zipCode": "24680"
      }
    ]     
  );

  const expected = [
    {
      "id": 2,
      "fullName": "Jane Smith",
      "addressLine1": "456 Elm St",
      "addressLine2": "Apt 2B",
      "city": "Somecity",
      "zipCode": "67890"
    }
  ];
  
  const result = await getUserData(2);
  
  expect(result).toStrictEqual(expected);

})


it("returns falsy if user doesn't exist", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "zipCode": "12345"
      }
    ]
  );

  const expected = []

  const result = await getUserData(2);

  expect(result).toStrictEqual(expected);
})


it("updates user's data", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "zipCode": "12345"
      },
      {
        "id": 2,
        "fullName": "Jane Smith",
        "addressLine1": "456 Elm St",
        "addressLine2": "Apt 2B",
        "city": "Somecity",
        "zipCode": "67890"
      },
    ]
  );

  const expected = {
    "id": 1,
    "fullName": "James Doe",
    "addressLine1": "456 Main St",
    "addressLine2": null,
    "city": "Chatown",
    "zipCode": "67891"
  };

  const argument = {
    "fullName": "James Doe",
    "addressLine1": "456 Main St",
    "addressLine2": null,
    "city": "Chatown",
    "zipCode": "67891"
  }

  const result = await updateUserData(1, expected);

  expect(result).toStrictEqual(expected);

})


it("updates user data on one field", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "zipCode": "12345"
      },
      {
        "id": 2,
        "fullName": "Jane Smith",
        "addressLine1": "456 Elm St",
        "addressLine2": "Apt 2B",
        "city": "Somecity",
        "zipCode": "67890"
      },
    ]
  );

  const expected = {
    "id": 2,
    "fullName": "Jane Greer",
    "addressLine1": "456 Elm St",
    "addressLine2": "Apt 2B",
    "city": "Somecity",
    "zipCode": "67890"
  };

  const argument = {
    "fullName": "Jane Greer",
    "addressLine1": "456 Elm St",
    "addressLine2": "Apt 2B",
    "city": "Somecity",
    "zipCode": "67890"
  }

  const result = await updateUserData(2, expected);
  
  expect(result).toStrictEqual(expected);
})

it("raises an error if user doesn't exist", async () => {

  getUsers.mockReturnValue(
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "zipCode": "12345"
      }
    ]
  );

  const argument = {
    "fullName": "Jane Greer",
    "addressLine1": "456 Elm St",
    "addressLine2": "Apt 2B",
    "city": "Somecity",
    "zipCode": "67890"
  }

  await expect(() => updateUserData(2, argument)).
                        toThrow("User doesn't exist");
})
