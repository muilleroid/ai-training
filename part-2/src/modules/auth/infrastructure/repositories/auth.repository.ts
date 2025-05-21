import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';

import { setup } from 'core/setup';

import type { TAuthRepository } from '../../domain/types';

import { authSchema } from '../schemas';

import { toAuth } from './auth-repository.mapper';

export const AuthRepository = new Elysia({ name: 'auth/repository' })
  .use(setup)
  .derive({ as: 'global' }, function deriveAuthRepository({ connection }) {
    const authRepository: TAuthRepository = {
      create: async ({ auth }) => {
        const [createdAuth] = await connection
          .insert(authSchema)
          .values({
            email: auth.email,
            name: auth.name,
            passwordHash: auth.passwordHash,
          })
          .returning();

        return toAuth(createdAuth);
      },
      findByEmail: async ({ email }) => {
        const [auth] = await connection.select().from(authSchema).where(eq(authSchema.email, email)).limit(1);

        return toAuth(auth);
      },
      findById: async ({ userId }) => {
        const [auth] = await connection.select().from(authSchema).where(eq(authSchema.id, userId)).limit(1);

        return toAuth(auth);
      },
    };

    return { authRepository };
  });
