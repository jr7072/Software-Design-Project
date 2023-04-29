const {hashCode, fetchUserAuthData } = require('../controllers/LoginController');
const {getAuth} = require('../models/UserDB');

jest.mock('../models/UserDB');

/*it('checks if hashcode is matching', async () => {
    
  //mock database call
  hashCode.mockReturnValue(-1178744323);

  const expected = -1178744323;
  
  const result = hashCode("testadmin");
  
  expect(result).toStrictEqual(expected);

})*/

it('checks if username and password is correct', async () => {
    
  //mock database call
  getAuth.mockReturnValue(
    {
      "username": "test_admin",
      "hash": hashCode("testadmin")
    }
  );

  const expected = {
    "username": "test_admin",
    "hash": hashCode("testadmin")
  };
  
  const result = await fetchUserAuthData("test_admin", "testadmin");
  
  expect(result).toStrictEqual(expected);

})

it('throws error if username does not exist', async () => {
  
  getAuth.mockReturnValue(-1);

  await expect(() => fetchUserAuthData("wrongusername", "testadmin")).rejects.toThrow("Username is incorrect");

})

/*

it('throws error if password is incorrect', async () => {
  
  //mock database call
  getAuth.mockReturnValue(
    [
      {
          "username": "john123",
          "hash": "123"
      }
    ]
  );

  await expect(() => fetchUserAuthData("john123", "12")).toThrow("Wrong Password");

})
*/