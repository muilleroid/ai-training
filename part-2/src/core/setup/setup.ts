import Elysia from 'elysia';

import { connection } from 'core/database';

export const setup = new Elysia({ name: 'setup' }).decorate('connection', connection);
