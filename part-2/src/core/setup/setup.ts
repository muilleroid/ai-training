import Elysia from 'elysia';

import { connection } from 'core/database';
import { jwt } from 'core/jwt';

export const setup = new Elysia({ name: 'setup' }).use(jwt).decorate('connection', connection);
