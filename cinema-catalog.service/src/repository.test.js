jest.mock('../config/database', () => ({
  connect: jest.fn()
}));

const database = require('../config/database');
const repository = require('./repository');

describe('repository', () => {
  test('getAllMovies retorna todos os filmes', async () => {
    const toArray = jest.fn().mockResolvedValue([{ _id: '1' }]);
    const collection = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({ toArray })
    });

    database.connect.mockResolvedValue({ collection });

    await expect(repository.getAllMovies()).resolves.toEqual([
      { _id: '1' }
    ]);

    expect(collection).toHaveBeenCalledWith('movies');
  });

  test('getMovieById procura pelo ObjectId', async () => {
    const movie = { _id: '691be514a6dda6c3b5ce5f47' };
    const findOne = jest.fn().mockResolvedValue(movie);

    database.connect.mockResolvedValue({
      collection: jest.fn().mockReturnValue({ findOne })
    });

    await expect(
      repository.getMovieById('691be514a6dda6c3b5ce5f47')
    ).resolves.toEqual(movie);

    expect(findOne).toHaveBeenCalledWith({
      _id: expect.any(Object)
    });
  });

  test('getMoviePremieres filtra pelo último mês', async () => {
    const toArray = jest.fn().mockResolvedValue([]);
    const find = jest.fn().mockReturnValue({ toArray });

    database.connect.mockResolvedValue({
      collection: jest.fn().mockReturnValue({ find })
    });

    await repository.getMoviePremieres();

    expect(find).toHaveBeenCalledWith({
      dataLancamento: {
        $gte: expect.any(Date)
      }
    });
  });
});