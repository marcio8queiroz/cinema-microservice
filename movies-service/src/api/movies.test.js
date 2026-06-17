const { test, expect } = require('@jest/globals');
const server = require('../server/server');
const movies = require('./movies');
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

let app = null;

beforeAll(async () => {
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
    
    // --- ADICIONE ESTES LOGS PARA ENTENDER O ERRO ---
    console.log('Status Recebido:', response.status);
    console.log('Corpo da Resposta:', response.body);
    // ------------------------------------------------
    
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
})
