import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { accountDomainFactory } from './account.domain';
import type { AccountInput, TAccountRepository } from './types';

const accountInputMock: AccountInput = {
  email: 'user@mail.com',
  name: 'name',
  passwordHash: 'hashed_password',
};

describe('account', () => {
  describe('AccountDomain', () => {
    const accountRepository = {
      create: mock(),
      findByEmail: mock(),
      findById: mock(),
    } satisfies TAccountRepository;

    const accountDomain = accountDomainFactory({ accountRepository });

    describe('create', () => {
      it('returns an account', async () => {
        const accountId = createId();

        accountRepository.create.mockResolvedValueOnce({
          ...accountInputMock,
          id: accountId,
        });

        const result = await accountDomain.create({ account: accountInputMock });

        expect(accountRepository.create).toHaveBeenCalledWith({ account: accountInputMock });

        expect(result).toEqual({
          ...accountInputMock,
          id: accountId,
        });
      });
    });

    describe('findByEmail', () => {
      it('returns an account', async () => {
        const accountId = createId();

        accountRepository.findByEmail.mockResolvedValueOnce({
          ...accountInputMock,
          id: accountId,
        });

        const result = await accountDomain.findByEmail({ email: accountInputMock.email });

        expect(accountRepository.findByEmail).toHaveBeenCalledWith({ email: accountInputMock.email });

        expect(result).toEqual({
          ...accountInputMock,
          id: accountId,
        });
      });
    });

    describe('findById', () => {
      it('returns an account ', async () => {
        const accountId = createId();

        accountRepository.findById.mockResolvedValueOnce({
          ...accountInputMock,
          id: accountId,
        });

        const result = await accountDomain.findById({ accountId });

        expect(accountRepository.findById).toHaveBeenCalledWith({ accountId });

        expect(result).toEqual({
          ...accountInputMock,
          id: accountId,
        });
      });
    });
  });
});
