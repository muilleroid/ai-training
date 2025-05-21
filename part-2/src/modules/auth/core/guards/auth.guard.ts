import Bearer from '@elysiajs/bearer';
import { Elysia } from 'elysia';

import { JwtDomain } from '../../domain';

export const AuthGuard = new Elysia({ name: 'auth/guard' })
  .use(Bearer())
  .use(JwtDomain)
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
