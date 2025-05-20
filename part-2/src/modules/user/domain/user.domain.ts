import { Elysia } from 'elysia';

import { userRepository } from '../infrastructure/repositories';

import type { CreateParams, DeleteParams, FindByIdParams, UpdateParams } from './user-domain.types';

export const userDomain = new Elysia({ name: 'user/domain' })
  .use(userRepository)
  .resolve({ as: 'global' }, ({ userRepository }) => {
    return {
      userDomain: {
        create: ({ user }: CreateParams) => {
          return userRepository.create({ user });
        },
        delete: ({ userId }: DeleteParams) => {
          return userRepository.delete({ userId });
        },
        find: () => {
          return userRepository.find();
        },
        findById: ({ userId }: FindByIdParams) => {
          return userRepository.findById({ userId });
        },
        update: ({ user, userId }: UpdateParams) => {
          return userRepository.update({
            user,
            userId,
          });
        },
      },
    };
  });
