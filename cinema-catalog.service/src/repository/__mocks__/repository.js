const movies = [{
        "_id":  "691be0990ebd7804bece5f47",
        "titulo": "Vingadores: Guerra Infinita",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Thanos",
        "duracao": 120,
        "dataLancamento": new Date("2025-10-20T00:00:00.000Z"),
        "imagem": "http://www.luiztools.com.br/vingadores-gi.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "691be514a6dda6c3b5ce5f47",
        "titulo": "Os Vingadores: Ultimato",
        "sinopse": "Os heróis mais poderosos da Terra enfrentando o Thanos. De novo.",
        "duracao": 181,
        "dataLancamento": new Date(),
        "imagem": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "691be514a6dda6c3b5ce5f48",
        "titulo": "Os Vingadores: Guerra Infinita",
        "sinopse": "Os heróis mais poderosos da Terra enfrentando o Thanos",
        "duracao": 149,
        "dataLancamento": {
            "$date": "2018-04-26T00:00:00.000Z"
        },
        "imagem": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "691be514a6dda6c3b5ce5f49",
        "titulo": "Os Vingadores: Era de Ultron",
        "sinopse": "Os heróis mais poderosos da Terra enfrentando o Ultron",
        "duracao": 141,
        "dataLancamento": new Date("2015-04-23T00:00:00.000Z"),
        "imagem": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "691be514a6dda6c3b5ce5f4a",
        "titulo": "Os Vingadores",
        "sinopse": "Os heróis mais poderosos da Terra enfrentando o Loki",
        "duracao": 143,
        "dataLancamento": new Date("2012-04-27T00:00:00.000Z"),
        "imagem": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    }];

async function getAllMovies() {
    return movies;
    
}

async function getMovieById(id) {
    return movies.find(m => m._id === id);
}

async function getMoviePremieres() {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    // Filtra diretamente do array 'movies' que está no topo do arquivo
    const premieres = movies.filter(m => new Date(m.dataLancamento) >= monthAgo);
    
    // Retorna sempre um array, conforme esperado pelo teste
    return Array.isArray(premieres) ? premieres : [premieres];
}

module.exports = { getAllMovies, getMovieById, getMoviePremieres }
