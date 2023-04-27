const {fetchAuth} = require('../controllers/RegistrationController');
const {getAuth} = require('../models/UserDB');

jest.mock('../models/UserDB');

//Test for adding a user to the db

it('fetch user auth from db', async () => {

  getAuth.mockReturnValue(
    {
      "hash": "",
      "username": "person1"
    }
  );

  const expected = {
    "hash": "",
    "username": "person1"
  };

  const data = await fetchAuth(1);

  expect(data).toStrictEqual(expected);

})

//Test for attempting to add a user when username is already taken