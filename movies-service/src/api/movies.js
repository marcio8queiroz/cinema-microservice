module.exports = (app, repository) => {

    app.get('/movies/premieres', async (req, res, next) => {   
        const movies = await repository.getMoviePremieres();
        if(!movies || movies.length) return res.sendStatus(404);

        res.json(movies);
            })


    app.get('/movies/:id', async (req, res, next) => {
        const movies = await repository.getMovieById(req.params.id);
        if(!movies) return res.sendStatus(404);

        res.json(movies);

})
   
    app.get('/movies', (req, res, next) => {
        const movies = repository.getAllMovies();
        if(!movies || movies.length) return res.sendStatus(404);

        res.json(movies);

})



}