const path = require('path');
const express = require('express');
const next = require('next');
const compression = require('compression');
const favicon = require('serve-favicon');
const helmet = require('helmet')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const chokidar = require('chokidar');

let router;

if (dev) {
    require('@babel/register')({
        extensions: ['.ts']
    });
    const loadRouter = () => {
        try {
            const routes = require('./api/routes.ts');
            router = routes.loadRoutes();
        } catch (e) {
            console.log(e);
        }
    }
    loadRouter();
    require('./api/queue.ts')
    chokidar.watch('./backend').on('change', (event, path) => {
        console.warn('\nFiles changed. Reloaded the server.');
        Object.keys(require.cache).forEach((id) => {
            if (id.indexOf('backend/') > -1) {
                delete require.cache[id];
            }
        });
        loadRouter();
    });
} else {
    require('./dist-api/queue.js');
    const routes = require('./dist-api/routes.js');
    router = routes.loadRoutes();
}

app.prepare()
    .then(() => {
        const server = express();
        server.get('/healthcheck', (req, res) => {
            res.send('');
        });
        server.get('/robots.txt', function (req, res) {
            res.type('text/plain');
            res.send("User-agent: *\nDisallow: /");
        });

        server.use(helmet());
        server.use(compression());
        server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

        server.use('/api', (req, res, next) => {
            router(req, res, next);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        const serverListener = server.listen(port, (err) => {
            if (err) throw err;
            console.warn(`> Ready on http://localhost:${port}`);
        });
        serverListener.on("error", function (err) {
            console.log(err)
        });
    });