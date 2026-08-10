const { MongoClient } = require('mongodb');
const database = require('./database');

jest.mock('mongodb');

test('Disconnecting Database should return true', async () => {
    // Adicione o método close ao mock do client
    const mockClient = { 
        connect: jest.fn(), 
        close: jest.fn().mockResolvedValue(true) // <--- O método que faltava
    };
    MongoClient.mockImplementation(() => mockClient);
    
    // Agora o seu database.js vai conseguir chamar client.close()
    const result = await database.disconnect();
    expect(result).toBe(true);
});