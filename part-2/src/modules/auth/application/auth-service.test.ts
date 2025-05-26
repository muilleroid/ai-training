import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import type { TAccountDomain, TCryptoDomain, TJwtDomain } from '../domain/types';

import { authServiceFactory } from './auth.service';

const accountMock = {
  email: 'user@mail.com',
  name: 'name',
  passwordHash: 'hashed_password',
};

describe('auth', () => {
  describe('AuthService', () => {
    const accountDomain = {
      create: mock(),
      findByEmail: mock(),
      findById: mock(),
    } satisfies TAccountDomain;

    const cryptoDomain = {
      hash: mock(),
      verify: mock(),
    } satisfies TCryptoDomain;

    const jwtDomain = {
      sign: mock(),
      verify: mock(),
    } satisfies TJwtDomain;

    const authService = authServiceFactory({ accountDomain, cryptoDomain, jwtDomain });

    beforeEach(() => {
      cryptoDomain.hash.mockReset();
      cryptoDomain.verify.mockReset();
      jwtDomain.sign.mockReset();
      jwtDomain.verify.mockReset();
    });

    describe('findById', () => {
      it('returns account an account', async () => {
        const accountId = createId();

        accountDomain.findById.mockResolvedValueOnce({
          ...accountMock,
          id: accountId,
        });

        const result = await authService.findById({ accountId });

        expect(accountDomain.findById).toHaveBeenCalledWith({ accountId });

        expect(result).toEqual({
          ...accountMock,
          id: accountId,
        });
      });
    });

    describe('signIn', () => {
      it('returns account and token when credentials are valid', async () => {
        const accountId = createId();

        accountDomain.findByEmail.mockResolvedValueOnce({
          ...accountMock,
          id: accountId,
        });
        cryptoDomain.verify.mockResolvedValueOnce(true);
        jwtDomain.sign.mockResolvedValueOnce('token');

        const result = await authService.signIn({
          email: accountMock.email,
          password: 'Asdf1234',
        });

        expect(accountDomain.findByEmail).toHaveBeenCalledWith({ email: accountMock.email });
        expect(cryptoDomain.verify).toHaveBeenCalledWith({
          password: 'Asdf1234',
          passwordHash: accountMock.passwordHash,
        });
        expect(jwtDomain.sign).toHaveBeenCalledWith({ id: accountId });

        expect(result).toEqual({
          account: {
            ...accountMock,
            id: accountId,
          },
          token: 'token',
        });
      });

      it('returns null when account does not exist', async () => {
        accountDomain.findByEmail.mockResolvedValueOnce(null);

        const result = await authService.signIn({
          email: accountMock.email,
          password: 'Asdf1234',
        });

        expect(accountDomain.findByEmail).toHaveBeenCalledWith({ email: accountMock.email });
        expect(cryptoDomain.verify).not.toHaveBeenCalled();
        expect(jwtDomain.sign).not.toHaveBeenCalled();

        expect(result).toBeNull();
      });

      it('returns null when password is invalid', async () => {
        accountDomain.findByEmail.mockResolvedValueOnce(accountMock);
        cryptoDomain.verify.mockResolvedValueOnce(false);

        const result = await authService.signIn({
          email: accountMock.email,
          password: 'Asdf1234',
        });

        expect(accountDomain.findByEmail).toHaveBeenCalledWith({ email: accountMock.email });
        expect(cryptoDomain.verify).toHaveBeenCalledWith({
          password: 'Asdf1234',
          passwordHash: accountMock.passwordHash,
        });
        expect(jwtDomain.sign).not.toHaveBeenCalled();

        expect(result).toBeNull();
      });
    });

    describe('signUp', () => {
      it('returns account and token when registration is successful', async () => {
        const accountId = createId();

        accountDomain.create.mockResolvedValueOnce({
          ...accountMock,
          id: accountId,
        });
        cryptoDomain.hash.mockResolvedValueOnce(accountMock.passwordHash);
        jwtDomain.sign.mockResolvedValueOnce('token');

        const result = await authService.signUp({
          email: accountMock.email,
          name: accountMock.name,
          password: 'Asdf1234',
        });

        expect(accountDomain.create).toHaveBeenCalledWith({
          account: {
            email: accountMock.email,
            name: accountMock.name,
            passwordHash: accountMock.passwordHash,
          },
        });
        expect(cryptoDomain.hash).toHaveBeenCalledWith({ password: 'Asdf1234' });
        expect(jwtDomain.sign).toHaveBeenCalledWith({ id: accountId });

        expect(result).toEqual({
          account: {
            ...accountMock,
            id: accountId,
          },
          token: 'token',
        });
      });

      it('returns null when account creation fails', async () => {
        accountDomain.create.mockResolvedValueOnce(null);
        cryptoDomain.hash.mockResolvedValueOnce(accountMock.passwordHash);

        const result = await authService.signUp({
          email: accountMock.email,
          name: accountMock.name,
          password: 'Asdf1234',
        });

        expect(accountDomain.create).toHaveBeenCalledWith({
          account: {
            email: accountMock.email,
            name: accountMock.name,
            passwordHash: accountMock.passwordHash,
          },
        });
        expect(cryptoDomain.hash).toHaveBeenCalledWith({ password: 'Asdf1234' });
        expect(jwtDomain.sign).not.toHaveBeenCalled();

        expect(result).toBeNull();
      });
    });
  });
});
