import { Elysia } from 'elysia';
import { DatabaseError } from 'pg';

import { config } from 'config';
import { swagger } from 'core/application/swagger';
import { BaseError } from 'core/errors';
import { setup } from 'core/setup';

import { instrumentation } from './instrumentation';
import { routes } from './routes';

export const appFactory = () => {
  return new Elysia()
    .use(instrumentation)
    .use(setup)
    .onError(({ code, error, logger, set }) => {
      if (error instanceof DatabaseError && (error.code === '23505' || error.code === '23503')) {
        set.status = 409;

        return { message: 'Conflict' };
      }

      if (error instanceof BaseError) {
        set.status = error.status;

        return { message: error.message };
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
