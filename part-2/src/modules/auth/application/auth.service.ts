import { Elysia } from 'elysia';

import { AccountDomain, CryptoDomain, JwtDomain } from '../domain';
import type { TAccountDomain, TCryptoDomain, TJwtDomain } from '../domain/types';

import type { TAuthService } from './types';

type AuthServiceFactoryParams = {
  accountDomain: TAccountDomain;
  cryptoDomain: TCryptoDomain;
  jwtDomain: TJwtDomain;
};

export const authServiceFactory = ({ accountDomain, cryptoDomain, jwtDomain }: AuthServiceFactoryParams) => {
  const authService: TAuthService = {
    findById: ({ accountId }: { accountId: string }) => {
      return accountDomain.findById({ accountId });
    },
    signIn: async ({ email, password }: { email: string; password: string }) => {
      const account = await accountDomain.findByEmail({ email });

      if (!account) {
        return null;
      }

      const passwordValid = await cryptoDomain.verify({
        password,
        passwordHash: account.passwordHash,
      });

      if (!passwordValid) {
        return null;
      }

      const token = await jwtDomain.sign({ id: account.id });

      return {
        account,
        token,
      };
    },
    signUp: async ({ email, name, password }: { email: string; name: string; password: string }) => {
      const passwordHash = await cryptoDomain.hash({ password });

      const account = await accountDomain.create({
        account: {
          email,
          name,
          passwordHash,
        },
      });

      if (!account) {
        return null;
      }

      const token = await jwtDomain.sign({ id: account.id });

      return {
        account,
        token,
      };
    },
  };

  return authService;
};

export const AuthService = new Elysia({ name: 'auth/service' })
  .use(AccountDomain)
  .use(CryptoDomain)
  .use(JwtDomain)
  .derive({ as: 'global' }, function deriveAuthService({ accountDomain, cryptoDomain, jwtDomain }) {
    const authService = authServiceFactory({ accountDomain, cryptoDomain, jwtDomain });

    return { authService };
  });
