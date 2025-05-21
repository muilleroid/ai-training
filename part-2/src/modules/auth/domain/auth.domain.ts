import { Elysia } from 'elysia';

import { AuthRepository } from '../infrastructure/repositories';

import type { CreateParams, FindByEmailParams, FindByIdParams } from './auth-domain.types';

export const AuthDomain = new Elysia({ name: 'auth/domain' })
  .use(AuthRepository)
  .derive({ as: 'global' }, function deriveAuthDomain({ authRepository }) {
    const authDomain = {
      create: ({ auth }: CreateParams) => {
        return authRepository.create({ auth });
      },
      findByEmail: ({ email }: FindByEmailParams) => {
        return authRepository.findByEmail({ email });
      },
      findById: ({ userId }: FindByIdParams) => {
        return authRepository.findById({ userId });
      },
    };

    return { authDomain };
  });
