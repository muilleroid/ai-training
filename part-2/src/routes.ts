import { Elysia } from 'elysia';

import { userController } from 'modules/user';

export const routes = new Elysia({ name: 'routes', prefix: '/api/v1' }).use(userController);
