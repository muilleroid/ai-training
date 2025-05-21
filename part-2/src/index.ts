import { Elysia } from 'elysia';

import { config } from 'config';
import { traceIdMiddleware } from 'core/middlewares';
import { swagger } from 'core/swagger';
import { setup } from 'core/setup';

import { instrumentation } from './instrumentation';
import { routes } from './routes';

const app = new Elysia()
  .use(instrumentation)
  .use(setup)
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return { message: 'Not Found' };
    }

    return { message: 'Internal Server Error' };
  })
  .use(traceIdMiddleware)
  .use(swagger)
  .use(routes)
  .listen(config.application.port);

console.log(`Listening on ${app.server!.url}`);
