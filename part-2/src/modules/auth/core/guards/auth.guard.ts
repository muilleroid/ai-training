import bearer from '@elysiajs/bearer';
import { Elysia } from 'elysia';

import { jwtDomain } from '../../domain';

export const authGuard = new Elysia({ name: 'auth/guard' })
  .use(bearer())
  .use(jwtDomain)
  .macro(({ onBeforeHandle }) => {
    return {
      authenticated: () => {
        onBeforeHandle(async function authenticated({ bearer, jwtDomain, status }) {
          const payload = await jwtDomain.verify({ token: bearer });

          if (!payload) {
            return status(401, { message: 'Unauthorized' });
          }
        });
      },
    };
  })
  .macro({
    withUserId: () => {
      return {
        resolve: async ({ bearer, jwtDomain }) => {
          const payload = await jwtDomain.verify({ token: bearer });

          if (!payload) {
            return { userId: '' };
          }

          return { userId: payload.id as string };
        },
      };
    },
  });
