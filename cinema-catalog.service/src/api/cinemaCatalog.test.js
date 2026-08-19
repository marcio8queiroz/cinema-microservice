const { test, expect } = require('@jest/globals');
const server = require('../server/server');
const movies = require('./movies');
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

let app = null;

beforeAll(async () => {
     process.env.PORT = '0';
     app = await server.start(movies, repositoryMock);
})

afterAll(async () => {
    await server.stop();
})


test('GET /movies', async () => {   
    const response = await request(app).get('/movies');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
})

test('GET /movies/:id', async () => {
    const testMovieId = '691be514a6dda6c3b5ce5f47';
    const response = await request(app).get(`/movies/${testMovieId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET /movies/premieres', async () => {
    const response = await request(app).get('/movies/premieres');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
})

test('GET /movies retorna 404 quando não há filmes', async () => {
    const spy = jest.spyOn(repositoryMock, 'getAllMovies').mockResolvedValueOnce([]);
    const response = await request(app).get('/movies');

    expect(response.status).toBe(404);
    spy.mockRestore();
});

test('GET /movies retorna 404 quando o repositório retorna null', async () => {
    const spy = jest.spyOn(repositoryMock, 'getAllMovies').mockResolvedValueOnce(null);
    const response = await request(app).get('/movies');

    expect(response.status).toBe(404);
    spy.mockRestore();
});

test('GET /movies/:id retorna 404 quando o filme não existe', async () => {
    const spy = jest.spyOn(repositoryMock, 'getMovieById').mockResolvedValueOnce(null);
    const response = await request(app).get('/movies/inexistente');

    expect(response.status).toBe(404);
    spy.mockRestore();
});

test('GET /movies/premieres aceita um único filme', async () => {
    const movie = { _id: '1', titulo: 'Filme' };
    const spy = jest.spyOn(repositoryMock, 'getMoviePremieres').mockResolvedValueOnce(movie);
    const response = await request(app).get('/movies/premieres');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([movie]);
    spy.mockRestore();
});

test.each([null, []])(
    'GET /movies/premieres retorna 404 para %p',
    async (result) => {
        const spy = jest.spyOn(repositoryMock, 'getMoviePremieres').mockResolvedValueOnce(result);
        const response = await request(app).get('/movies/premieres');

        expect(response.status).toBe(404);
        spy.mockRestore();
    }
);
