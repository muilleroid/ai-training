import { Elysia } from 'elysia';

import { AccountRepository } from '../infrastructure/repositories';

import type { CreateParams, FindByEmailParams, FindByIdParams } from './account-domain.types';

export const AccountDomain = new Elysia({ name: 'account/domain' })
  .use(AccountRepository)
  .derive({ as: 'global' }, function deriveAccountDomain({ accountRepository }) {
    const accountDomain = {
      create: ({ account }: CreateParams) => {
        return accountRepository.create({ account });
      },
      findByEmail: ({ email }: FindByEmailParams) => {
        return accountRepository.findByEmail({ email });
      },
      findById: ({ accountId }: FindByIdParams) => {
        return accountRepository.findById({ accountId });
      },
    };

    return { accountDomain };
  });
