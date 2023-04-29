const {checkFieldStatus, validateFields } = require('../controllers/FuelController');
const {getStatus, getFuelData} = require('../models/UserDB');

jest.mock('../models/UserDB');

it('checks if field status is true', async () => {
    
  //mock database call
  getStatus.mockReturnValue(true);

  const expected = true;
  
  const result = await checkFieldStatus({});
  
  expect(result).toStrictEqual(expected);

})

it('checks if field status is false', async () => {
    
  //mock database call
  getStatus.mockReturnValue(false);

  const expected = false;
  
  const result = await checkFieldStatus({'gallons': 'Gallons field is required'});
  
  expect(result).toStrictEqual(expected);

})

it('checks if results is empty', async () => {
    
  //mock database call
  getFuelData.mockReturnValue({
    'gallons': '100',
    'address': 'TX  Houston TX 77082',
    'date': '2023-04-29',
    'price': 171
  });

  const data = {
    'gallons': '100',
    'address': 'TX  Houston TX 77082',
    'date': '2023-04-29',
    'price': 171
  };

  const expected = {};
  
  const result = await validateFields(data);
  
  expect(result).toStrictEqual(expected);

})

it('checks if results are flagged', async () => {
    
  //mock database call
  getFuelData.mockReturnValue({});

  const data = {};

  const expected = {
    'gallons': 'Gallons field is required',
    'address': 'Address field is required',
    'date': 'Date field is required',
    'price': 'Price field is required'
  };
  
  const result = await validateFields(data);
  
  expect(result).toStrictEqual(expected);

})