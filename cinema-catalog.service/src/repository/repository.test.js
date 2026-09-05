require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env')
});

const database = require('../config/database');
const repository = require('./repository');

afterAll(async () => {
  await database.disconnect();
});

test('getAllCities', async () => {
  const cities = await repository.getAllCities();
  expect(Array.isArray(cities)).toBe(true);
  expect(cities.length).toBeGreaterThan(0);
});
