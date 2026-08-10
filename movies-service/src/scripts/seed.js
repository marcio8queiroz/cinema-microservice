const { MongoClient, ObjectId } = require('mongodb');

const premiereDate = new Date();
premiereDate.setDate(premiereDate.getDate() - 7);

const movies = [
    {
        _id: new ObjectId('691be0990ebd7804bece5f47'),
        titulo: 'Vingadores: Guerra Infinita',
        sinopse: 'Os heróis mais poderosos da Marvel enfrentando o Thanos',
        duracao: 149,
        dataLancamento: new Date('2018-04-26T00:00:00.000Z'),
        imagem: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg',
        categorias: ['Aventura', 'Ação']
    },
    {
        _id: new ObjectId('691be514a6dda6c3b5ce5f47'),
        titulo: 'Vingadores: Ultimato',
        sinopse: 'Os heróis sobreviventes enfrentam Thanos uma última vez',
        duracao: 181,
        dataLancamento: new Date('2019-04-25T00:00:00.000Z'),
        imagem: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
        categorias: ['Aventura', 'Ação']
    },
    {
        _id: new ObjectId('691be514a6dda6c3b5ce5f49'),
        titulo: 'Vingadores: Era de Ultron',
        sinopse: 'Os Vingadores precisam impedir os planos de Ultron',
        duracao: 141,
        dataLancamento: new Date('2015-04-23T00:00:00.000Z'),
        imagem: 'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_UX182_CR0,0,182,268_AL_.jpg',
        categorias: ['Aventura', 'Ação']
    },
    {
        _id: new ObjectId('691be514a6dda6c3b5ce5f4a'),
        titulo: 'Os Vingadores',
        sinopse: 'Os heróis mais poderosos da Terra enfrentam Loki',
        duracao: 143,
        dataLancamento: new Date('2012-04-27T00:00:00.000Z'),
        imagem: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        categorias: ['Aventura', 'Ação']
    },
    {
        _id: new ObjectId('691be514a6dda6c3b5ce5f4b'),
        titulo: 'Vingadores: Nova Era',
        sinopse: 'Uma nova formação dos Vingadores enfrenta uma ameaça global',
        duracao: 155,
        dataLancamento: premiereDate,
        imagem: 'https://placehold.co/182x268?text=Vingadores%3A+Nova+Era',
        categorias: ['Aventura', 'Ação']
    }
];

async function seed() {
    const client = new MongoClient(process.env.MONGO_CONNECTION);

    try {
        await client.connect();
        const collection = client.db(process.env.DATABASE).collection('movies');
        const result = await collection.bulkWrite(
            movies.map((movie) => ({
                updateOne: {
                    filter: { _id: movie._id },
                    update: { $set: movie },
                    upsert: true
                }
            }))
        );

        const total = await collection.countDocuments();
        console.log(`Seed concluído: ${result.upsertedCount} inserido(s), ${result.modifiedCount} atualizado(s).`);
        console.log(`Total de filmes na coleção: ${total}.`);
    } finally {
        await client.close();
    }
}

seed().catch((error) => {
    console.error('Não foi possível alimentar o banco:', error.message);
    process.exitCode = 1;
});
