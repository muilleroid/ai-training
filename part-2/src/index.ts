import { Elysia } from 'elysia';

import { swagger } from 'core/swagger';
import { setup } from 'core/setup';

import { routes } from './routes';

new Elysia().use(setup).use(swagger).use(routes).listen(3000);
