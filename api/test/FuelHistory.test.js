const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const fuelQuoteHistoryRouter = require('../routes/FuelHistoryRouter');


const app = express();
app.use(bodyParser.json());
app.use('/fuelQuoteHistory', fuelQuoteHistoryRouter);


describe('fuelQuoteHistoryRouter', () => {
    describe('GET /', () => {
        test('should return a statusCode 200 response and get the fuel Quote History of the user', async () => {
            const res = await request(app).get('/fuelquotehistory')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
            expect(res.body).toEqual([{
                gallonsRequested: 5,
                deliveryAddress: "1313 Main st 77093, Houston Texas",
                deliveryDate: "03/15/2023",
                suggestedPricePerGallon: 5,
                totalAmountDue: 25
            }]);

        })
        test('The fuel quote history json should always be in an array and have the right key names', async () => {
            const res = await request(app).get('/fuelquotehistory')
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toHaveProperty('gallonsRequested');
            expect(res.body[0]).toHaveProperty('deliveryAddress');
            expect(res.body[0]).toHaveProperty('deliveryDate');
            expect(res.body[0]).toHaveProperty('suggestedPricePerGallon');
            expect(res.body[0]).toHaveProperty('totalAmountDue');
        })
    })
})