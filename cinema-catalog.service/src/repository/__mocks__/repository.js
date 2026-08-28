const cinemaCatalog = [
  {
    cidade: "Gravataí",
    uf: "RS",
    pais: "BR",
    cinemas: []
  },
  {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [
      {
        _id: ObjectId(),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: ISODate("2026-08-28T19:00:00Z"),
                idFilme: ObjectId("691be0990ebd7804bece5f47"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                  { numero: 3, disponivel: true },
                  { numero: 4, disponivel: true },
                  { numero: 5, disponivel: false }
                ]
              },
              {
                data: ISODate("2025-08-06T21:30:00Z"),
                idFilme: ObjectId("691be514a6dda6c3b5ce5f47"),
                filme: "Vingadores: Ultimato",
                valor: 30.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                  { numero: 3, disponivel: false },
                  { numero: 4, disponivel: true },
                  { numero: 5, disponivel: true }
                ]
              }
            ]
          },
          {
            nome: 2,
            sessoes: [
              {
                data: ISODate("2024-03-28T20:00:00Z"),
                idFilme: ObjectId("691be514a6dda6c3b5ce5f49"),
                filme: "Vingadores: Era de Ultron",
                valor: 32.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                  { numero: 3, disponivel: true },
                  { numero: 4, disponivel: false },
                  { numero: 5, disponivel: false }
                ]
              }
            ]
          }
        ]
      },
      {
        _id: ObjectId(),
        nome: "UCI New York City Center",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: ISODate("2023-09-29T18:00:00Z"),
                idFilme: ObjectId("691be514a6dda6c3b5ce5f4a"),
                filme: "Os Vingadores",
                valor: 35.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                  { numero: 3, disponivel: false },
                  { numero: 4, disponivel: true },
                  { numero: 5, disponivel: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    cidade: "Manaus",
    uf: "AM",
    pais: "BR",
    cinemas: [
      {
        _id: ObjectId(),
        nome: "Cinemais Millennium",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: ISODate("2022-05-30T19:30:00Z"),
                idFilme: ObjectId("66d000000000000000000005"),
                filme: "Batman",
                valor: 28.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                  { numero: 3, disponivel: true },
                  { numero: 4, disponivel: true },
                  { numero: 5, disponivel: true }
                ]
              }
            ]
          }
        ]
      },
      {
        _id: ObjectId(),
        nome: "Cinépolis Ponta Negra",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: ISODate("2021-08-30T21:00:00Z"),
                idFilme: ObjectId("691be514a6dda6c3b5ce5f4b"),
                filme: "Vingadores: Nova Era",
                valor: 31.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                  { numero: 3, disponivel: true },
                  { numero: 4, disponivel: false },
                  { numero: 5, disponivel: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    cidade: "São Paulo",
    uf: "SP",
    pais: "BR",
    cinemas: [
      {
        _id: ObjectId(),
        nome: "Cinemark Eldorado",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: ISODate("1999-08-31T20:00:00Z"),
                idFilme: ObjectId("66d000000000000000000007"),
                filme: "Matrix",
                valor: 34.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                  { numero: 3, disponivel: false },
                  { numero: 4, disponivel: false },
                  { numero: 5, disponivel: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default cinemaCatalog;

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
