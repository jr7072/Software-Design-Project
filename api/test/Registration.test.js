const {hashCode, fetchUserAuthData } = require('../controllers/RegistrationController');
const {authDB} = require('../models/UserDB');

jest.mock('../models/UserDB');

it('checks if username and password is correct', async () => {
    
  //mock database call
  authDB.mockReturnValue(
    [
      {
          "username": "john123",
          "hash": "123"
      },
      {
          "username": "jane!",
          "hash": "111"
      },
      {
          "username": "bobross",
          "hash": "222"
      }
    ]     
  );

  const expected = {
      "username": "john123",
      "hash": "123"
  };
  
  const result = await fetchUserAuthData("john123", "123");
  
  expect(result).toStrictEqual(expected);

})

it('throws error if username does not exist', async () => {
  
  //mock database call
  authDB.mockReturnValue(
    [
      {
          "username": "john123",
          "hash": ""
      }
    ]
  );

  await expect(() => fetchUserAuthData("jane!", "")).toThrow("User doesn't exist");

})

it('throws error if password is incorrect', async () => {
  
  //mock database call
  authDB.mockReturnValue(
    [
      {
          "username": "john123",
          "hash": "123"
      }
    ]
  );

  await expect(() => fetchUserAuthData("john123", "12")).toThrow("Wrong Password");

})