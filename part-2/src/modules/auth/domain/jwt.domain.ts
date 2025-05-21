import { Elysia } from 'elysia';

import { setup } from 'core/setup';

import type { SignParams, VerifyParams } from './jwt-domain.types';

export const JwtDomain = new Elysia({ name: 'jwt/domain' })
  .use(setup)
  .derive({ as: 'global' }, function deriveJwtDomain({ jwt }) {
    const jwtDomain = {
      sign: ({ id }: SignParams) => {
        return jwt.sign({ id });
      },
      verify: ({ token }: VerifyParams) => {
        return jwt.verify(token);
      },
    };

    return { jwtDomain };
  });
