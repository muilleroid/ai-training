import { Elysia } from 'elysia';

import { setup } from 'core/setup';

import type { SignParams, VerifyParams } from './jwt-domain.types';

export const jwtDomain = new Elysia({ name: 'jwt/domain' }).use(setup).resolve({ as: 'global' }, ({ jwt }) => {
  return {
    jwtDomain: {
      sign: ({ id }: SignParams) => {
        return jwt.sign({ id });
      },
      verify: ({ token }: VerifyParams) => {
        return jwt.verify(token);
      },
    },
  };
});
