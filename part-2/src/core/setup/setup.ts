import Elysia from 'elysia';

import { traceIdMiddleware } from 'core/application/trace-id';
import { connection } from 'core/infrastructure/database';
import { jwt } from 'core/infrastructure/jwt';
import { logger } from 'core/infrastructure/logger';

export const setup = new Elysia({ name: 'setup' })
  .use(jwt)
  .use(traceIdMiddleware)
  .decorate('connection', connection)
  .decorate('logger', logger);
