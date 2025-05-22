import type { Account } from '../../domain/types';

import type { AccountSchema } from '../schemas';

export const toAccount = (account?: AccountSchema | null): Account | null => {
  if (!account) {
    return null;
  }

  return {
    email: account.email,
    id: account.id,
    name: account.name,
    passwordHash: account.passwordHash,
  };
};
