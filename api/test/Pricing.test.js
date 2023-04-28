const {priceCalculation} = require('../controllers/PricingController');
const {getPrice} = require('../models/UserDB');

jest.mock('../models/UserDB');

it('checks if pricing value is correct', async () => {
    
    //mock database call
    getPrice.mockReturnValue(1710);
  
    const expected = 1710;
    
    const result = await priceCalculation(1000, 'TX', ['7be72dd0-e600-11ed-853b-d72c097bf9e5']);
    
    expect(result).toStrictEqual(expected);
  
  })