const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const fuelQuoteHistoryRouter = require('../routes/FuelHistoryRouter');
const connection = require('../connection');

const app = express();
app.use(bodyParser.json());
app.use('/fuelquotehistory', fuelQuoteHistoryRouter);

describe('fuelQuoteHistoryRouter', () => {
  describe('GET /fuelquotehistory', () => {
    test('should return fuel quote history for a given email', async () => {
      const mockConnection = jest.spyOn(connection, 'query').mockImplementation((query, callback) => {
        callback(null, [{ gallons: 100, address: '123 Main St', deliveryDate: '2023-04-01', pricePerGallon: 2.50, totalAmount: 250 }]);
      });

      const res = await request(app).get('/fuelquotehistory?email=test@example.com');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([{ gallons: 100, address: '123 Main St', deliveryDate: '2023-04-01', pricePerGallon: 2.50, totalAmount: 250 }]);

      mockConnection.mockRestore(); 
    });

    test('should return an error if the database query fails', async () => {
      const mockConnection = jest.spyOn(connection, 'query').mockImplementation((query, callback) => {
        callback(new Error('Database query failed'));
      });

      const res = await request(app).get('/fuelquotehistory?email=test@example.com');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ error: 'Failed to retrieve fuel quote history' });

      mockConnection.mockRestore(); 
    });
  });
});