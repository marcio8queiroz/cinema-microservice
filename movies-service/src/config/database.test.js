const { test, expect } = require('@jest/globals');
const database = require('./database');

test('Connecting Database', async () => { 
    const connection = await database.connect();
    expect(connection).toBeTruthy();
 })

 test('Disconnecting Database', async () => { 
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
 })

 test('Disconnecting Database 2x', async () => { 
    await database.disconnect();
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
 })

// const { test, expect } = require('@jest/globals');
// const database = require('./database');

// // 1. TESTE DE CONEXÃO
// test('Connecting Database should return a DB object', async () => { 
//     // Garante que o método connect funciona e retorna o objeto DB
//     const connection = await database.connect();
//     expect(connection).toBeTruthy();
    
//     // Boa prática: Desconectar após o teste que usa a conexão
//     await database.disconnect(); 
// });

// // 2. TESTE DE DESCONEXÃO APÓS CONEXÃO (Já coberto no teste acima, mas é bom ter um teste explícito)
// test('Disconnecting Database should return true after connecting', async () => { 
//     // Conecta primeiro (para garantir que 'client' não seja nulo)
//     await database.connect(); 
    
//     // ✅ CHAMA o método disconnect
//     const isDisconnected = await database.disconnect();
    
//     // Verifica se retornou true
//     expect(isDisconnected).toBe(true); 
// });

// // 3. TESTE DA DESCONEXÃO SEM CONEXÃO (Cobre o 'if(!client) return true;')
// test('Disconnecting Database should return true when called without prior connection', async () => { 
//     // Garante que 'client' está nulo
//     await database.disconnect(); 
    
//     // ✅ CHAMA o método disconnect novamente
//     const isDisconnected = await database.disconnect();
    
//     // Verifica se retornou true (cobrindo o branch do "if")
//     expect(isDisconnected).toBe(true);
// });