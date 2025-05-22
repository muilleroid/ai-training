import type { Account } from './account';

type CreateParams = {
  account: Omit<Account, 'id'>;
};

type FindById = {
  accountId: string;
};

type FindByEmailParams = {
  email: string;
};

export type TAccountRepository = {
  create: (params: CreateParams) => Promise<Account | null>;
  findByEmail: (params: FindByEmailParams) => Promise<Account | null>;
  findById: (params: FindById) => Promise<Account | null>;
};
