module.exports = (app, repository) => {

    app.get('/cities', async (req, res, next) => {   
    const cities = await repository.getAllCities();
    res,json(cities);
    
    // Garante que o que enviamos é um array, mesmo que contenha apenas um item
    const movies = result == null
  ? []
  : Array.isArray(result)
    ? result
    : [result];

    // Retorna 404 se não houver movies OU se o array estiver vazio (!movies.length)
    if (movies.length === 0) {
        return res.sendStatus(404);
    }

    res.json(movies);
});

    app.get('/cities/:cityId/movies', async (req, res, next) => {
        const movies = await repository.getMoviesByCityId(req.params.cityId);
        if(!movies) return res.sendStatus(404);

        res.json(movies);

})

    app.get('/cities/:cityId/movies/:movieId', async (req, res, next) => {
        const sessions = await repository.getMovieSessionsByCityId(req.params.movieId, req.params.cityId);
        if(!sessions) return res.sendStatus(404);

        res.json(sessions);

})
   
    app.get('/cities/:cityId/cinemas', async (req, res, next) => {
        const cinemas = await repository.getCinemasByCityId(req.params.cityId);
        if(!cinemas) return res.sendStatus(404);

    
    // CORREÇÃO: Retorna 404 APENAS se movies for nulo OU se o tamanho for 0
    if (!movies || movies.length === 0) {
        return res.sendStatus(404);
    }

    // Se passou pelo if, é porque temos filmes. Agora enviamos o JSON.
    res.json(cinemas);
});

    app.get('/cinemas/:cinemaId/movies', async (req, res, next) => {
        const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);
        if(!movies) return res.sendStatus(404);

        res.json(movies);

    })

    app.get('/cinemas/:cinemaId/movies/:movieId', async (req, res, next) => {
        const sessions = await repository.getMovieSessionsByCinemaId(req.params.movieId, req.params.cinemaId);
        if(!sessions) return res.sendStatus(404);

        res.json(sessions);

    })

}
