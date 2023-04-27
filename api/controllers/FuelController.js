const {getAuth} = require('../models/UserDB');

const validate = (gallons, address, date) => {
    let errors = {};
  
    if (!gallons) {
      errors.gallons = 'Number of Gallons is required';
    } else if (isNaN(gallons) || gallons <= 0) {
      errors.gallons = 'Number of Gallons must be a positive number';
    }
  
    if (!address) {
      errors.address = 'Address is required';
    }

    if (!date) {
      errors.date = 'Date is required';
    } else {
      const today = new Date();
      const selectedDate = new Date(date);
  
      if (selectedDate < today) {
        errors.date = 'Selected date must be today or later';
      }
    }
  
    return errors;
  };
  





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
  checkFieldStatus
}