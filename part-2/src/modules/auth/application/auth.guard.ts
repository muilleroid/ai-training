import { Elysia } from 'elysia';

import { AccountIdMiddleware } from './account-id.middleware';

export const AuthGuard = new Elysia({ name: 'auth/guard' }).use(AccountIdMiddleware).macro(({ onBeforeHandle }) => {
  return {
    authenticated: () => {
      onBeforeHandle(function authGuard({ accountId, status }) {
        if (!accountId) {
          return status(401, { message: 'Unauthorized' });
        }
      });
    },
  };
});
