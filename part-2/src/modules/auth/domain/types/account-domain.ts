import type { Account } from './account';
import type { AccountInput } from './account-input';

type CreateParams = {
  account: AccountInput;
};

type FindByEmailParams = {
  email: string;
};

type FindByIdParams = {
  accountId: string;
};

export type TAccountDomain = {
  create: (params: CreateParams) => Promise<Account | null>;
  findByEmail: (params: FindByEmailParams) => Promise<Account | null>;
  findById: (params: FindByIdParams) => Promise<Account | null>;
};
