const request = require('supertest')
const express = require('express');
const bodyParser = require('body-parser');
const fuelQuotesRouter = require('../routes/fuelQuoteRouter');

const app = express();
app.use(bodyParser.json());
app.use('/fuelQuotes', fuelQuotesRouter);

describe('fuelQuotesRouter', () => {
  describe('POST /', () => {
    test('should return a 200 response with a message when all required fields are provided', async () => {
      const res = await request(app)
        .post('/fuelQuotes')
        .send({
          gallons: 100,
          address: '123 Main St',
          deliveryDate: '2023-04-01',
          pricePerGallon: 2.50
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });

    test('should return a 400 response with an error message when a required field is missing', async () => {
      const res = await request(app)
        .post('/fuelQuotes')
        .send({
          gallons: 100,
          address: '123 Main St',
          pricePerGallon: 2.50
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /fuelQuotes', () => {
    test('should return the user inputs as JSON', async () => {
      const res = await request(app)
        .get('/fuelQuotes')
        .send({
          gallons: 100,
          address: '123 Main St',
          deliveryDate: '2023-04-01',
          pricePerGallon: 2.50
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        gallons: 100,
        address: '123 Main St',
        deliveryDate: '2023-04-01',
        pricePerGallon: 2.50
      });
    });
  });
});

