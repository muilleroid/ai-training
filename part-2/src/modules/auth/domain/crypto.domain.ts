import { Elysia } from 'elysia';

import type { TCryptoDomain } from './types';

export const cryptoDomainFactory = () => {
  const cryptoDomain: TCryptoDomain = {
    hash: ({ password }) => {
      return Bun.password.hash(password, { algorithm: 'bcrypt' });
    },
    verify: ({ password, passwordHash }) => {
      return Bun.password.verify(password, passwordHash);
    },
  };

  return cryptoDomain;
};

export const CryptoDomain = new Elysia({ name: 'crypto/domain' }).derive(
  { as: 'global' },
  function deriveCryptoDomain() {
    const cryptoDomain = cryptoDomainFactory();

    return { cryptoDomain };
  },
);
