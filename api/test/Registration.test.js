const {hashCode, fetchUserAuthData} = require('../controllers/RegistrationController');
const {authDB} = require('../models/UserDB');

jest.mock('../models/UserDB');

//Test for adding a user to the db

it('adds user to db', async () => {
    
    //mock database call
    authDB.mockReturnValue(
      [
        {
            "username": "john123",
            "password": "123"
        },
        {
            "username": "jane!",
            "password": "111"
        },
        {
            "username": "bobross",
            "password": "222"
        }
      ]     
    );
  
    const expected = {
        "username": "john123",
        "hash": hashCode("123")
    };
    
    const result = await fetchUserAuthData("john123", "123");
    
    expect(result).toStrictEqual(expected);
  
  })

//Test for attempting to add a user when username is already taken