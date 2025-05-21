import { Elysia } from 'elysia';

import type { HashParams, VerifyParams } from './crypto-domain.types';

export const cryptoDomain = new Elysia({ name: 'crypto/domain' }).resolve({ as: 'global' }, () => {
  return {
    cryptoDomain: {
      hash: ({ password }: HashParams) => {
        return Bun.password.hash(password, { algorithm: 'bcrypt' });
      },
      verify: ({ password, passwordHash }: VerifyParams) => {
        return Bun.password.verify(password, passwordHash);
      },
    },
  };
});
