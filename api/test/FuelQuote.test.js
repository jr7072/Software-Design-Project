const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const fuelQuotesRouter = require('../routes/FuelQuoteRouter');
const app = express();

app.use(bodyParser.json());
app.use('/fuelQuotes', fuelQuotesRouter);

describe('fuelQuotesRouter', () => {
  describe('POST /', () => {
    it('should return a 200 response with a message when all required fields are provided', async () => {
      const res = await request(app)
        .post('/fuelQuotes')
        .send({
          email: 'noah@gmail.com',
          gallons: 100,
          address: '123 Main St',
          deliveryDate: '2023-04-01',
          pricePerGallon: 2.50
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });

  });

  describe('GET /fuelQuotes', () => {
    it('should return the user inputs as JSON', async () => {
      const res = await request(app)
        .get('/fuelQuotes')
        .send({
          email: 'something@gmail.com',
          gallons: 100,
          address: '123 Main St',
          deliveryDate: '2023-04-01',
          pricePerGallon: 2.50
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        email: 'noah@gmail.com',
        gallons: 100,
        address: '563 Main St',
        deliveryDate: '2023-04-01',
        pricePerGallon: 2.50
      });
    });
  });
});
