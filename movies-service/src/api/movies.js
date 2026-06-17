module.exports = (app, repository) => {

    app.get('/movies/premieres', async (req, res, next) => {   
    const result = await repository.getMoviePremieres();
    
    // Garante que o que enviamos é um array, mesmo que contenha apenas um item
    const movies = Array.isArray(result) ? result : [result];

    // Retorna 404 se não houver movies OU se o array estiver vazio (!movies.length)
    if (!movies || movies.length === 0) {
        return res.sendStatus(404);
    }

    console.log('--- LOG API ---');
    console.log('O que vou enviar no res.json:', movies);
    res.json(movies);
});

    app.get('/movies/:id', async (req, res, next) => {
        const movies = await repository.getMovieById(req.params.id);
        if(!movies) return res.sendStatus(404);

        res.json(movies);

})
   
    app.get('/movies', async (req, res, next) => {
    const movies = await repository.getAllMovies();
    
    //console.log('Log da Rota /movies:', movies);

    // CORREÇÃO: Retorna 404 APENAS se movies for nulo OU se o tamanho for 0
    if (!movies || movies.length === 0) {
        return res.sendStatus(404);
    }

    // Se passou pelo if, é porque temos filmes. Agora enviamos o JSON.
    res.json(movies);
});



}