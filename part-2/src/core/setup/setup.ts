import Elysia from 'elysia';

import { TraceIdMiddleware } from 'core/application/trace-id';
import { connection } from 'core/infrastructure/database';
import { jwt } from 'core/infrastructure/jwt';
import { logger } from 'core/infrastructure/logger';

export const setup = new Elysia({ name: 'setup' })
  .use(jwt)
  .use(TraceIdMiddleware)
  .decorate('connection', connection)
  .decorate('logger', logger);
