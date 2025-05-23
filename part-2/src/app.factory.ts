import { Elysia } from 'elysia';

import { config } from 'config';
import { swagger } from 'core/application/swagger';
import { setup } from 'core/setup';

import { instrumentation } from './instrumentation';
import { routes } from './routes';

export const appFactory = () => {
  return new Elysia()
    .use(instrumentation)
    .use(setup)
    .onError(({ code, error, logger }) => {
      if (code === 'NOT_FOUND') {
        return { message: 'Not Found' };
      }

      if (code === 'INTERNAL_SERVER_ERROR' || code === 'UNKNOWN') {
        logger.error(error);

        return { message: 'Internal Server Error' };
      }
    })
    .use(swagger)
    .use(routes)
    .listen(config.application.port);
};
