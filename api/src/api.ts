import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';

import { loadRoutes } from './routes/routes';
import { errorHandling } from './middlewares/error-middleware';

const port = 8080;

const server = express();
server.get('/healthcheck', (_, res) => {
  res.send('');
});
server.use(helmet());
server.use(compression());
server.use(bodyParser.json());
server.use(cors());
server.use(errorHandling);

loadRoutes(server);

const serverListener = server.listen(port, (err: Error) => {
  if (err) throw err;
  console.warn(`> Ready on http://localhost:${port}`);
});
serverListener.on('error', function(err) {
  console.log(err);
});
