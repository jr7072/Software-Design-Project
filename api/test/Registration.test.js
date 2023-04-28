const {createNewUserAuth, hashCode} = require('../controllers/RegistrationController');
const {createUserAuth, createUser} = require('../models/UserDB');

jest.mock('../models/UserDB');
//username: regtestuser
//password: regtestpass

it('checks if username and password is valid', async () => {
    
  //mock database call
  createUserAuth.mockReturnValue(
    [
      {
          "username": "regtestuser",
          "hash": hashCode("regtestpass")
      }
    ]
  );

  const expected = [{
    "username": "regtestuser",
    "hash": hashCode("regtestpass")
  }];
  
  const result = await createNewUserAuth("regtestuser", "regtestpass");
  
  expect(result).toStrictEqual(expected);

})