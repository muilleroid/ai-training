import { Elysia } from 'elysia';

import { setup } from 'core/setup';
import { userController } from 'modules/user/presentation';

const app = new Elysia({ prefix: '/api' }).use(setup).use(userController).listen(3000);
