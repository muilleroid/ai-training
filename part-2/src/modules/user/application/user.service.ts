import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';

import { UserDomain } from '../domain';
import type { TUserDomain } from '../domain/types';

import type { TUserService } from './types';

type UserServiceFactoryParams = {
  userDomain: TUserDomain;
};

export const userServiceFactory = ({ userDomain }: UserServiceFactoryParams) => {
  const userService: TUserService = {
    create: async ({ user }) => {
      const createdUser = await userDomain.create({ user });

      return createdUser!;
    },
    delete: async ({ userId }) => {
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
    findById: async ({ userId }) => {
      const exists = await userDomain.exists({ userId });

      if (!exists) {
        throw new NotFoundError('User not found');
      }

      const foundUser = await userDomain.findById({ userId });

      return foundUser!;
    },
    update: async ({ user, userId }) => {
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

  return userService;
};

export const UserService = new Elysia({ name: 'user/service' })
  .use(UserDomain)
  .derive({ as: 'global' }, function deriveUserService({ userDomain }) {
    const userService = userServiceFactory({ userDomain });

    return { userService };
  });
