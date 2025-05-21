import { Elysia } from 'elysia';

import type { HashParams, VerifyParams } from './crypto-domain.types';

export const CryptoDomain = new Elysia({ name: 'crypto/domain' }).resolve({ as: 'global' }, () => {
  const cryptoDomain = {
    hash: ({ password }: HashParams) => {
      return Bun.password.hash(password, { algorithm: 'bcrypt' });
    },
    verify: ({ password, passwordHash }: VerifyParams) => {
      return Bun.password.verify(password, passwordHash);
    },
  };

  return { cryptoDomain };
});
