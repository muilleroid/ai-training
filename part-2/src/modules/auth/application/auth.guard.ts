import { Elysia } from 'elysia';

import { UnauthorizedError } from 'core/errors';

import { AccountIdMiddleware } from './account-id.middleware';

export const AuthGuard = new Elysia({ name: 'auth/guard' }).use(AccountIdMiddleware).macro(({ onBeforeHandle }) => {
  return {
    authenticated: () => {
      onBeforeHandle(function authGuard({ accountId }) {
        if (!accountId) {
          throw new UnauthorizedError('Unauthorized');
        }
      });
    },
  };
});
