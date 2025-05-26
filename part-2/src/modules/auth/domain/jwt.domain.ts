import { Elysia } from 'elysia';

import { setup } from 'core/setup';

import type { JwtProvider, TJwtDomain, TokenPayload } from './types';

type JwtDomainFactoryParams = {
  jwt: JwtProvider;
};

export const jwtDomainFactory = ({ jwt }: JwtDomainFactoryParams) => {
  const jwtDomain: TJwtDomain = {
    sign: ({ id }) => {
      return jwt.sign({ id });
    },
    verify: async ({ token }) => {
      const payload = await jwt.verify(token);

      return payload as unknown as TokenPayload;
    },
  };

  return jwtDomain;
};

export const JwtDomain = new Elysia({ name: 'jwt/domain' })
  .use(setup)
  .derive({ as: 'global' }, function deriveJwtDomain({ jwt }) {
    const jwtDomain = jwtDomainFactory({ jwt });

    return { jwtDomain };
  });
