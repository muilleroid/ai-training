import type { AccountInput } from './types';

export type CreateParams = {
  account: AccountInput;
};

export type FindByIdParams = {
  accountId: string;
};

export type FindByEmailParams = {
  email: string;
};
