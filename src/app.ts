import express, { Express } from 'express';
import { getPokemonName, setPokemonName } from './pokemon';
import pinoHttp from 'pino-http';
import { logger } from './logger';
import { logResponseTime } from './log-response-time';

import { ulid } from 'ulid';

export const app: Express = express();
app.use(pinoHttp({ logger }));

// Add a unique request id to each request
app.use((req: express.Request, res, next) => {
  const childLogger = logger.child({ req_id: req.id || ulid() });
  req.logger = childLogger;
  next();
});

// Log the response time
app.use(logResponseTime);

app.get('/pokemon/:id', async (req: express.Request, res) => {
  const { id } = req.params;
  if (!id) {
    req.logger.error({ error: 'id is required' });
    res.status(400).send({ error: 'id is required' });
  }
  const pokemon = await getPokemonName(+id);
  if (!pokemon) {
    req.logger.error({
      error: 'pokemon not found',
      id,
    });
    res.status(404).send({ error: 'pokemon not found' });
  }
  req.logger.debug({ pokemon });
  res.send(pokemon);
});

app.post('/pokemon/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: 'id is required' });
  }

  const pokemon = await setPokemonName(+id, req.body?.name);

  res.send(pokemon);
});

app.get('/', async (req, res) => {
  return res.send({ hello: 'world' });
});
