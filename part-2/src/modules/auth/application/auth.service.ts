import { Elysia } from 'elysia';

import { authDomain, cryptoDomain, jwtDomain } from '../domain';

import type { SignInParams, SignUpParams } from './auth-service.types';

export const authService = new Elysia({ name: 'auth/service' })
  .use(authDomain)
  .use(cryptoDomain)
  .use(jwtDomain)
  .resolve({ as: 'global' }, ({ authDomain, cryptoDomain, jwtDomain }) => {
    return {
      authService: {
        findById: ({ userId }: { userId: string }) => {
          return authDomain.findById({ userId });
        },
        signIn: async ({ email, password }: SignInParams) => {
          const auth = await authDomain.findByEmail({ email });

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

          const auth = await authDomain.create({
            auth: {
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
      },
    };
  });
