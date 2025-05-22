import Bearer from '@elysiajs/bearer';
import { Elysia } from 'elysia';

import { JwtDomain } from '../domain';

export const AccountIdMiddleware = new Elysia({ name: 'accountId' })
  .use(Bearer())
  .use(JwtDomain)
  .derive({ as: 'global' }, async function deriveAccountId({ bearer, jwtDomain }) {
    const payload = await jwtDomain.verify({ token: bearer });

    if (!payload) {
      return { accountId: '' };
    }

    return { accountId: payload.id as string };
  });
