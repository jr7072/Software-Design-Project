const {getAuth} = require('../models/UserDB');

function validateFields(data) {
  const results = {};
  
  if (!data.gallons) {
    results.gallons = 'Gallons field is required';
  } else if (isNaN(data.gallons) || data.gallons <= 0) {
    results.gallons = 'Gallons field should be a positive number';
  }
  
  if (!data.address) {
    results.address = 'Address field is required';
  }
  
  if (!data.date) {
    results.date = 'Date field is required';
  } else {
    const currentDate = new Date();
    const enteredDate = new Date(data.date);
    if (enteredDate < currentDate) {
      results.date = 'Date field should be a future date';
    }
  }
  
  if (!data.price) {
    results.price = 'Price field is required';
  } else if (isNaN(data.price) || data.price <= 0) {
    results.price = 'Price field should be a positive number';
  }
  

  return results;
}


  const checkFieldStatus = (fieldResults) => {
    
    let status = true

    for (const fieldStatus of Object.values(fieldResults)){

        const valid = fieldStatus.valid;

        if (!valid){
            status = false;
        }

    }

    return status
}

module.exports = {
  checkFieldStatus,
  validateFields
}
