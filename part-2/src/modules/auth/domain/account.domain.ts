import { Elysia } from 'elysia';

import { AccountRepository } from '../infrastructure/repositories';

import type { TAccountDomain, TAccountRepository } from './types';

type AccountDomainFactoryParams = {
  accountRepository: TAccountRepository;
};

export const accountDomainFactory = ({ accountRepository }: AccountDomainFactoryParams): TAccountDomain => {
  const accountDomain: TAccountDomain = {
    create: ({ account }) => {
      return accountRepository.create({ account });
    },
    findByEmail: ({ email }) => {
      return accountRepository.findByEmail({ email });
    },
    findById: ({ accountId }) => {
      return accountRepository.findById({ accountId });
    },
  };

  return accountDomain;
};

export const AccountDomain = new Elysia({ name: 'account/domain' })
  .use(AccountRepository)
  .derive({ as: 'global' }, function deriveAccountDomain({ accountRepository }) {
    const accountDomain = accountDomainFactory({ accountRepository });

    return { accountDomain };
  });
