import Elysia from 'elysia';

import { TraceIdMiddleware } from 'core/application/trace-id';
import { db } from 'core/infrastructure/database';
import { jwt } from 'core/infrastructure/jwt';
import { logger } from 'core/infrastructure/logger';

export const setup = new Elysia({ name: 'setup' })
  .use(jwt)
  .use(TraceIdMiddleware)
  .decorate('db', db)
  .decorate('logger', logger);
