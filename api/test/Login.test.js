const {hashCode, fetchUserAuthData } = require('../controllers/LoginController');
const {authDB} = require('../models/UserDB');

jest.mock('../models/UserDB');

it('should return user data by id', async () => {
    
    //mock database call
    authDB.mockReturnValue(
      [
        {
            "username": "john123",
            "hash": ""
        },
        {
            "username": "jane!",
            "hash": ""
        },
        {
            "username": "bobross",
            "hash": ""
        }
      ]     
    );
  
    const expected = {
        "username": "john123",
        "hash": ""
    };
    
    const result = await fetchUserAuthData("john123");
    
    expect(result).toStrictEqual(expected);
  
  })