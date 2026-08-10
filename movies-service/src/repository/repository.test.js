// 1. O Mock deve vir primeiro
jest.mock('./repository'); 

// 2. O require deve ser único
const repository = require('./repository');
const { test, expect, beforeAll } = require('@jest/globals');

let testMovieId = null;

beforeAll(async () => {
    // Agora o Jest usará a versão mockada automaticamente
    const movies = await repository.getAllMovies();
    testMovieId = movies[0]._id;
});

// Garante que o repositório use o mock do banco de dados
jest.mock('../config/database', () => ({
    connect: jest.fn().mockResolvedValue({
        collection: jest.fn().mockReturnValue({
            find: jest.fn().mockReturnValue({ 
                toArray: jest.fn().mockResolvedValue([{ _id: '691be514a6dda6c3b5ce5f47' }]) 
            }),
            findOne: jest.fn().mockResolvedValue({ _id: '691be514a6dda6c3b5ce5f47' })
        })
    })
}));


test('getAllMovies', async () => { 
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeGreaterThan(0); // Mais preciso que truthy
 })

 test('getMovieById', async () => { 
    const movie  = await repository.getMovieById(testMovieId);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(testMovieId)
 })

 test('getMoviePremieres', async () => { 
   const monthAgo = new Date();
   monthAgo.setMonth(monthAgo.getMonth() - 1);

    const movies = await repository.getMoviePremieres()
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    // CÓDIGO CORRIGIDO (comparando timestamps numéricos)
expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
 })
