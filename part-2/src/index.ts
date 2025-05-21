import { Elysia } from 'elysia';

import { config } from 'config';
import { swagger } from 'core/swagger';
import { setup } from 'core/setup';

import { routes } from './routes';

new Elysia()
  .use(setup)
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return { message: 'Not Found' };
    }

    return { message: 'Internal Server Error' };
  })
  .use(swagger)
  .use(routes)
  .listen(config.application.port);

console.log(`Server is running on http://0.0.0.0:${config.application.port}`);
