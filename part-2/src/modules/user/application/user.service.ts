import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';

import { UserDomain } from '../domain';

import type { CreateParams, DeleteParams, FindByIdParams, UpdateParams } from './user-service.types';

export const UserService = new Elysia({ name: 'user/service' })
  .use(UserDomain)
  .derive({ as: 'global' }, function deriveUserService({ userDomain }) {
    const userService = {
      create: async ({ user }: CreateParams) => {
        const createdUser = await userDomain.create({ user });

        return createdUser!;
      },
      delete: async ({ userId }: DeleteParams) => {
        const exists = await userDomain.exists({ userId });

        if (!exists) {
          throw new NotFoundError('User not found');
        }

        const deletedUser = await userDomain.delete({ userId });

        return deletedUser!;
      },
      find: () => {
        return userDomain.find();
      },
      findById: async ({ userId }: FindByIdParams) => {
        const exists = await userDomain.exists({ userId });

        if (!exists) {
          throw new NotFoundError('User not found');
        }

        const foundUser = await userDomain.findById({ userId });

        return foundUser!;
      },
      update: async ({ user, userId }: UpdateParams) => {
        const exists = await userDomain.exists({ userId });

        if (!exists) {
          throw new NotFoundError('User not found');
        }

        const updatedUser = await userDomain.update({
          user,
          userId,
        });

        return updatedUser!;
      },
    };

    return { userService };
  });
