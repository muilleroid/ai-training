import type { Account } from '../../domain/types';

type FindByIdParams = {
  accountId: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  name: string;
  password: string;
};

export type TAuthService = {
  findById: (params: FindByIdParams) => Promise<Account | null>;
  signIn: (params: SignInParams) => Promise<{ account: Account; token: string } | null>;
  signUp: (params: SignUpParams) => Promise<{ account: Account; token: string } | null>;
};
