import { Elysia } from 'elysia';

import { authRepository } from '../infrastructure/repositories';

import type { CreateParams, FindByEmailParams, FindByIdParams } from './auth-domain.types';

export const authDomain = new Elysia({ name: 'auth/domain' })
  .use(authRepository)
  .resolve({ as: 'global' }, ({ authRepository }) => {
    const domain = {
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

    return { authDomain: domain };
  });
