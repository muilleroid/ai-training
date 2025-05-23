import { Elysia } from 'elysia';
import { DatabaseError } from 'pg';

import { config } from 'config';
import { swagger } from 'core/application/swagger';
import { setup } from 'core/setup';

import { instrumentation } from './instrumentation';
import { routes } from './routes';

export const appFactory = () => {
  return new Elysia()
    .use(instrumentation)
    .use(setup)
    .onError(({ code, error, logger, set }) => {
      if (error instanceof DatabaseError && error.code === '23505') {
        set.status = 409;

        return { message: 'Conflict' };
      }

      if (code === 'NOT_FOUND') {
        set.status = 404;

        return { message: 'Not Found' };
      }

      if (code !== 'PARSE' && code !== 'VALIDATION') {
        logger.error(error);

        set.status = 500;

        return { message: 'Internal Server Error' };
      }
    })
    .use(swagger)
    .use(routes)
    .listen(config.application.port);
};
