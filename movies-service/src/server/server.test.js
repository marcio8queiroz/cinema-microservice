const { test, expect } = require('@jest/globals');
const server = require('./server');
const request = require('supertest');

const apiMock = jest.fn((app) => {
    app.get('/error', (req, res, next) => next(new Error('erro de teste')));
});
let app;

beforeAll(async () => {
    process.env.PORT = '0';
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

test('não permite iniciar o servidor duas vezes', async () => {
    await expect(server.start(apiMock)).rejects.toThrow('Server is already running');
});

test('retorna 500 quando a API encaminha um erro', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const response = await request(app).get('/error');

    expect(response.status).toBe(500);
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
});

test('propaga erro ao fechar o servidor', async () => {
    const originalClose = app.close.bind(app);
    app.close = (callback) => callback(new Error('falha ao fechar'));

    await expect(server.stop()).rejects.toThrow('falha ao fechar');

    app.close = originalClose;
});

test('Server Stop', async () => {
    const isStopped = await server.stop();
    expect(isStopped).toBeTruthy();
});

test('Server Stop sem servidor também retorna true', async () => {
    await expect(server.stop()).resolves.toBe(true);
});
