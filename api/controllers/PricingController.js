//I think I need this for checking if I there exists a fuel quote history -Jenn
//I am going to need some help checking for fuel history - Jenn
const { response } = require('express');
const {getUserFuelHistory} = require('../models/UserDB');

function priceCalculation(Gallons, Address, fuelHistory){
    //this is the set price per gallon
    const basePrice = 1.5;

    //formula: suggested price = current price + margin
    //margin = current price * (location factor - rate history factor + gallons requested factor + company profit factor)
    
    //if the address is local then the location factor is 0.02 if not then its 0.04

    let local = 'TX';

    let localFactor;

    if(Address.includes(local)){
        localFactor = 0.02;
    }
    else {
        localFactor = 0.04;
    }

    //if there's no fuel history then the history factor is 0% otherwise its 1%
    
    let histFactor;

    //the variable history should be a boolean, ill fix later

    if(fuelHistory.length == 0){
        histFactor = 0;
    }
    else{
        histFactor = 0.01;
    }

    //if amount of gallons requested is more than 1000 then the gallons requested factor is 2% otherwise its 3%

    let gallonFactor;

    if(Gallons > 1000){
        gallonFactor = 0.02;
    }
    else{
        gallonFactor = 0.03;
    }

    //company profit factor will always be 10%
    const compFactor = 0.10;

    let margin = basePrice * (localFactor - histFactor + gallonFactor + compFactor);

    const suggested = basePrice + margin;

    const totalAmountDue = suggested * Gallons;

    if(totalAmountDue < 0){
        return 'error';
    }
    //this is the total amount due
    return totalAmountDue;

}

module.exports = {
    priceCalculation
}