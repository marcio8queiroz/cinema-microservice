jest.mock('mongodb');

describe('database', () => {
    let MongoClient;
    let database;
    let mockClient;

    beforeEach(() => {
        jest.resetModules();
        MongoClient = require('mongodb').MongoClient;
        mockClient = {
            connect: jest.fn().mockResolvedValue(undefined),
            db: jest.fn().mockReturnValue({ name: 'movies-service' }),
            close: jest.fn().mockResolvedValue(undefined)
        };
        MongoClient.mockImplementation(() => mockClient);
        database = require('./database');
    });

    test('conecta e retorna o banco configurado', async () => {
        await expect(database.connect()).resolves.toEqual({ name: 'movies-service' });
        expect(MongoClient).toHaveBeenCalledWith(process.env.MONGO_CONNECTION);
        expect(mockClient.connect).toHaveBeenCalledTimes(1);
        expect(mockClient.db).toHaveBeenCalledWith(process.env.DATABASE);
    });

    test('reutiliza o MongoClient nas próximas conexões', async () => {
        await database.connect();
        await database.connect();

        expect(MongoClient).toHaveBeenCalledTimes(1);
        expect(mockClient.connect).toHaveBeenCalledTimes(2);
    });

    test('disconnect retorna true quando não existe cliente', async () => {
        await expect(database.disconnect()).resolves.toBe(true);
        expect(mockClient.close).not.toHaveBeenCalled();
    });

    test('fecha uma conexão existente', async () => {
        await database.connect();
        await expect(database.disconnect()).resolves.toBe(true);
        expect(mockClient.close).toHaveBeenCalledTimes(1);

        await database.connect();
        expect(MongoClient).toHaveBeenCalledTimes(2);
    });
});
