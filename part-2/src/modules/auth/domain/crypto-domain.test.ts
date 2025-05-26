import { describe, expect, it } from 'bun:test';

import { cryptoDomainFactory } from './crypto.domain';

describe('crypto', () => {
  describe('CryptoDomain', () => {
    const cryptoDomain = cryptoDomainFactory();

    describe('hash', () => {
      it('returns a hashed password', async () => {
        const password = 'Asdf1234';

        const result = await cryptoDomain.hash({ password });

        expect(typeof result).toEqual('string');
        expect(result).not.toEqual(password);
      });
    });

    describe('verify', () => {
      it('returns true for correct password', async () => {
        const password = 'Asdf1234';
        const passwordHash = await cryptoDomain.hash({ password });

        const result = await cryptoDomain.verify({
          password,
          passwordHash,
        });

        expect(result).toBe(true);
      });

      it('returns false for incorrect password', async () => {
        const passwordHash = await cryptoDomain.hash({ password: 'Asdf1234' });

        const result = await cryptoDomain.verify({
          password: 'password',
          passwordHash,
        });

        expect(result).toBe(false);
      });
    });
  });
});
