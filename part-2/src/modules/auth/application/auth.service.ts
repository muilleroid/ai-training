import { Elysia } from 'elysia';

import { AccountDomain, CryptoDomain, JwtDomain } from '../domain';

import type { FindByIdParams, SignInParams, SignUpParams } from './auth-service.types';

export const AuthService = new Elysia({ name: 'auth/service' })
  .use(AccountDomain)
  .use(CryptoDomain)
  .use(JwtDomain)
  .derive({ as: 'global' }, function deriveAuthService({ accountDomain, cryptoDomain, jwtDomain }) {
    const authService = {
      findById: ({ accountId }: FindByIdParams) => {
        return accountDomain.findById({ accountId });
      },
      signIn: async ({ email, password }: SignInParams) => {
        const auth = await accountDomain.findByEmail({ email });

        if (!auth) {
          return null;
        }

        const passwordValid = await cryptoDomain.verify({
          password,
          passwordHash: auth.passwordHash,
        });

        if (!passwordValid) {
          return null;
        }

        const token = await jwtDomain.sign({ id: auth.id });

        return {
          auth,
          token,
        };
      },
      signUp: async ({ email, name, password }: SignUpParams) => {
        const passwordHash = await cryptoDomain.hash({ password });

        const auth = await accountDomain.create({
          account: {
            email,
            name,
            passwordHash,
          },
        });

        if (!auth) {
          return null;
        }

        const token = await jwtDomain.sign({ id: auth.id });

        return {
          auth,
          token,
        };
      },
    };

    return { authService };
  });
