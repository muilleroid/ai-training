import Elysia from 'elysia';

import { connection } from 'core/database';
import { jwt } from 'core/jwt';
import { logger } from 'core/logger';
import { traceIdMiddleware } from 'core/middlewares';

export const setup = new Elysia({ name: 'setup' })
  .use(jwt)
  .use(traceIdMiddleware)
  .decorate('connection', connection)
  .decorate('logger', logger);
