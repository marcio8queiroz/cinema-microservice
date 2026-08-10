const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

let server = null;

async function start(api, repository) {
    if (server?.listening) {
        throw new Error('Server is already running');
    }

    const app = express();

    app.use(helmet());
    app.use(morgan('dev'));

    app.get('/health', (req, res, next) => {
        res.send(`The service ${process.env.MS_NAME} is running at  ${process.env.PORT}`); //rota - saber se tudo está rodando ok em produção
        })

    api(app, repository);

    app.use((error, req, res, next) => {
        console.error(error);
        res.sendStatus(500);  
})

    server = app.listen(process.env.PORT, () => {
        console.log(`The ${process.env.MS_NAME} already started at ${process.env.PORT}`);
    })
    
    return server;
}

async function stop() {
    if (!server) return true;

    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
    server = null;
    return true;
}

module.exports = { start, stop };
