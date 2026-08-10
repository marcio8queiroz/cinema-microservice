const { test, expect } = require('@jest/globals');
const server = require('./server');
const request = require('supertest');

const apiMock = jest.fn((app, repository) => true);
let app;

beforeAll(async () => {
    process.env.PORT = 3001;
    app = await server.start(apiMock);
});

afterAll(async () => {
    await server.stop();
});

test('Server Start', () => {
    expect(app).toBeTruthy();
});

test('Health Check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toEqual(200);
});

test('Server Stop', async () => {
    const isStopped = await server.stop();
    expect(isStopped).toBeTruthy();
});
