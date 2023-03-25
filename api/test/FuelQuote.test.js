const { validateFields, checkFieldStatus } = require('../controllers/UserController');

it('should return an error for missing fields', () => {
  const data = {
    gallons: '',
    address: '',
    date: ''
  };
  const result = validateFields(data);
  expect(result).toEqual({
    success: false,
    errors: {
      gallons: 'Gallons is required',
      address: 'Address is required',
      date: 'Delivery date is required'
    }
  });
});

it('should return an error for invalid fields', () => {
  const data = {
    gallons: 'abc',
    address: '123 Main St',
    date: '2023-04-31'
  };
  const result = validateFields(data);
  expect(result).toEqual({
    success: false,
    errors: {
      gallons: 'Gallons must be a number greater than 0',
      address: 'Address must be a valid string',
      date: 'Delivery date must be a valid date in YYYY-MM-DD format'
    }
  });
});

it('should return success for valid fields', () => {
  const data = {
    gallons: '100',
    address: '123 Main St',
    date: '2023-04-01'
  };
  const result = validateFields(data);
  expect(result).toEqual({
    success: true,
    errors: {}
  });
});

it('should return false for invalid field status', () => {
  const data = {
    success: false,
    errors: {
      gallons: 'Gallons must be a number greater than 0',
      address: 'Address must be a valid string',
      date: 'Delivery date must be a valid date in YYYY-MM-DD format'
    }
  };
  const result = checkFieldStatus(data);
  expect(result).toEqual(false);
});

it('should return true for valid field status', () => {
  const data = {
    success: true,
    errors: {}
  };
  const result = checkFieldStatus(data);
  expect(result).toEqual(true);
});

