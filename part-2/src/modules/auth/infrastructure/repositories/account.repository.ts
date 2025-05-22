import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';

import { setup } from 'core/setup';

import type { TAccountRepository } from '../../domain/types';

import { accountSchema } from '../schemas';

import { toAccount } from './account-repository.mapper';

export const AccountRepository = new Elysia({ name: 'account/repository' })
  .use(setup)
  .derive({ as: 'global' }, function deriveAccountRepository({ connection }) {
    const accountRepository: TAccountRepository = {
      create: async ({ account }) => {
        const [createdAccount] = await connection
          .insert(accountSchema)
          .values({
            email: account.email,
            name: account.name,
            passwordHash: account.passwordHash,
          })
          .returning();

        return toAccount(createdAccount);
      },
      findByEmail: async ({ email }) => {
        const [account] = await connection.select().from(accountSchema).where(eq(accountSchema.email, email)).limit(1);

        return toAccount(account);
      },
      findById: async ({ accountId }) => {
        const [account] = await connection.select().from(accountSchema).where(eq(accountSchema.id, accountId)).limit(1);

        return toAccount(account);
      },
    };

    return { accountRepository };
  });
