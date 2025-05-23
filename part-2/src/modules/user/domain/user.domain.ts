import { Elysia } from 'elysia';

import { UserRepository } from '../infrastructure/repositories';

import type { CreateParams, DeleteParams, ExistsParams, FindByIdParams, UpdateParams } from './user-domain.types';

export const UserDomain = new Elysia({ name: 'user/domain' })
  .use(UserRepository)
  .derive({ as: 'global' }, function deriveUserDomain({ userRepository }) {
    const userDomain = {
      create: ({ user }: CreateParams) => {
        return userRepository.create({ user });
      },
      delete: ({ userId }: DeleteParams) => {
        return userRepository.delete({ userId });
      },
      exists: ({ userId }: ExistsParams) => {
        return userRepository.exists({ userId });
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
    };

    return { userDomain };
  });
