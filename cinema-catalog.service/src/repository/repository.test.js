require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env')
});

const database = require('../config/database');
const repository = require('./repository');

let cityId = null;
let cinemaId = null;
let movieId = null;

beforeAll(async () => {
  const cities = await repository.getAllCities();
  cityId = cities[cities.length - 1]._id;

  const cinemas = await repository.getCinemasByCityId(cityId);
  cinemaId = cinemas[0]._id;

  movieId = cinemas[0].salas[0].sessoes[0].idFilme;
  console.log(movieId);
})

afterAll(async () => {
  await database.disconnect();
});

test('getAllCities', async () => {
  const cities = await repository.getAllCities();
  expect(Array.isArray(cities)).toBe(true);
  expect(cities.length).toBeGreaterThan(0);
});

test('getCinemasByCityId', async () => {
  const cinemas = await repository.getCinemasByCityId(cityId);
  expect(Array.isArray(cinemas)).toBeTruthy();
});


test('getMoviesByCinemaId', async () => {
  const movies = await repository.getMoviesByCinemaId(cinemaId);
  // console.log(movies);
  expect(movies).toBeTruthy();
  expect(Array.isArray(movies)).toBeTruthy()
  expect(movies.length).toBeTruthy()
});

test('getMoviesByCityId', async () => {
  const movies = await repository.getMoviesByCityId(cityId);
  // console.log(movies);
  expect(movies).toBeTruthy();
  expect(Array.isArray(movies)).toBeTruthy()
  expect(movies.length).toBeTruthy()
});

test('getMovieSessionsByCityId', async () => {
  const movieSessions = await repository.getMovieSessionsByCityId(movieId, cityId);
  expect(movieSessions).toBeTruthy();
  expect(Array.isArray(movieSessions)).toBeTruthy()
  expect(movieSessions.length).toBeTruthy()
});
