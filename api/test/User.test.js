// test for user registration

const {
  getUserData,
  updateUserData,
  validateFields,
  checkFieldStatus  
} = require('../controllers/UserController');

const {getUsers} = require('../models/UserDB');

jest.mock('../models/UserDB');


it('should return user data by id', async () => {
    
  //mock database call
  getUsers.mockReturnValue(
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "addressLine1": "456 Elm St",
      "addressLine2": "Apt 2B",
      "city": "Somecity",
      "state": "TX",
      "zipCode": "67890",
      "fuelQuote": {
        "empty": "empty"
      }
    },
  );

  const expected = {
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

it("throws error if user doesn't exist", async() => {

  getUsers.mockReturnValue(
    null
  );

  try{
    await getUserData(2);
  } catch (e) {
    expect(e).toStrictEqual(Error("User doesn't exist"));
  }

})

it("updates user's data", async () => {

  getUsers.mockReturnValue(
      {
        "firstName": "John",
        "lastName": "Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345",
        "fuelQuote": {
          "empty": "empty"
        }
    }
  );

  const expected = {
    "firstName": "James",
    "lastName": "Doe",
    "addressLine1": "456 Main St",
    "addressLine2": null,
    "city": "Chatown",
    "state": "CA",
    "zipCode": "67891",
  };

  const argument = {
    "firstName": "James",
    "addressLine1": "456 Main St",
    "city": "Chatown",
    "zipCode": "67891"
  }

  const result = await updateUserData(1, argument);

  expect(result).toStrictEqual(expected);

})


it("updates user data on one field", async () => {

  getUsers.mockReturnValue(
    {
      "firstName": "Jane",
      "lastName": "husk",
      "addressLine1": "456 Elm St",
      "addressLine2": "Apt 2B",
      "city": "Somecity",
      "state": 'TX',
      "zipCode": "67890",
      "fuelQuote": {
        "empty": "empty"
      }
    }
  );

  const expected = {
    "firstName": "Jane",
    "lastName": "Greer",
    "addressLine1": "456 Elm St",
    "addressLine2": "Apt 2B",
    "city": "Somecity",
    "state": 'TX',
    "zipCode": "67890"
  };

  const argument = {
    "lastName": "Greer",
  }

  const result = await updateUserData(2, argument);
  
  expect(result).toStrictEqual(expected);
})


it("raises an error if user doesn't exist", async () => {

  getUsers.mockReturnValue(
    null
  );

  try{
    await updateUserData(2, {});
  } catch (e) {
    expect(e).toStrictEqual(Error("User doesn't exist"));
  }
})


it("throws an error if user field is not valid", async () => {

  getUsers.mockReturnValue(
      {
        "firstName": "John",
        "lastName": "Doe",
        "addressLine1": "123 Main St",
        "addressLine2": null,
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345",
        "fuelQuote": {
          "empty": "empty"
        }
      }
  );

  const argument = {
    "shirt size": {value: "large"}
  };

  try{
    await updateUserData(1, argument);
  } catch (e) {
    expect(e).toStrictEqual(Error("Invalid field: shirt size"));
  }

})


it("validates user data and returns accepted for each field", () => {

  const input = {
    "firstName": "John",
    "lastName": "Doe",
    "addressLine1": "123 Main St",
    "addressLine2": null,
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
  }

  const expected_result = {
    "firstName": {valid: true, message: 'accepted'},
    "lastName": {valid: true, message: 'accepted'},
    "addressLine1": {valid: true, message: 'accepted'},
    "addressLine2": {valid: true, message: 'accepted'},
    "city": {valid: true, message: 'accepted'},
    "state": {valid: true, message: 'accepted'},
    "zipCode": {valid: true, message: 'accepted'}
  }

  const result = validateFields(input);

  expect(result).toStrictEqual(expected_result);

})


it("catched length errors in proposed inputs", () => {

  const input = {
    "firstName": "Johnafsdsddddfdsklfjdskljfdsalkjfdlsjfldsakjfdlskajflkdasjfkldsjf",
    "lastName": "Doe",
    "addressLine1": "123 Main Stdfsahkfjdsalk;fjdsajfkdslf;dsajfkdsal;fjdskalf;dsajkffdasjfdsajfkdlafjdkslafjdsal;kfjdsklfds",
    "addressLine2": null,
    "city": "Anytownfdjsakfjdsklafjdslka;fjdkslafjd;safjkdls;afjdklsa;fjdksal;fjdksl;fasdffdsfdsfdsafdsafdsafdsafdsafdsafdsafdas",
    "state": "CA",
    "zipCode": "12343243242423"
  }

  const expected_result = {
    "firstName": {valid: false, message: 'expected input length to be between 0 and 50'},
    "lastName": {valid: true, message: 'accepted'},
    "addressLine1": {valid: false, message: 'expected input length to be between 0 and 100'},
    "addressLine2": {valid: true, message: 'accepted'},
    "city": {valid: false, message: 'expected input length to be between 0 and 100'},
    "state": {valid: true, message: 'accepted'},
    "zipCode": {valid: false, message: 'expected input length to be between 5 and 9'}
  }

  const result = validateFields(input);

  expect(result).toStrictEqual(expected_result);
})


it("catches fields that are required but empty", () => {

  const input = {
    "firstName": "",
    "lastName": "Doe",
    "addressLine1": "123 Main St",
    "addressLine2": null,
    "city": "",
    "state": "CA",
    "zipCode": ""
  }

  const expectedResult = {
    "firstName": {valid: false, message: 'required'},
    "lastName": {valid: true, message: 'accepted'},
    "addressLine1": {valid: true, message: 'accepted'},
    "addressLine2": {valid: true, message: 'accepted'},
    "city": {valid: false, message: 'required'},
    "state": {valid: true, message: 'accepted'},
    "zipCode": {valid: false, message: 'required'}
  }
  
  const result = validateFields(input);

  expect(result).toStrictEqual(expectedResult);

})


it("checks that all data is valid", () => {

  const input = {
    "firstName": {valid: true, message: 'accepted'},
    "lastName": {valid: true, message: 'accepted'},
    "addressLine1": {valid: true, message: 'accepted'},
    "addressLine2": {valid: true, message: 'accepted'},
    "city": {valid: true, message: 'accepted'},
    "state": {valid: true, message: 'accepted'},
    "zipCode": {valid: true, message: 'accepted'}
  }

  const result = checkFieldStatus(input);

  expect(result).toBeTruthy();

})

it("detects that a field is invalid", () => {

  const input = {
    "firstName": {valid: false, message: 'required'},
    "lastName": {valid: true, message: 'accepted'},
    "addressLine1": {valid: true, message: 'accepted'},
    "addressLine2": {valid: true, message: 'accepted'},
    "city": {valid: false, message: 'required'},
    "state": {valid: true, message: 'accepted'},
    "zipCode": {valid: false, message: 'required'}
  }

  const result = checkFieldStatus(input);

  expect(result).toBeFalsy();
})

