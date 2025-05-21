import { Elysia } from 'elysia';

import { UserDomain } from '../domain';

import type { CreateParams, DeleteParams, FindByIdParams, UpdateParams } from './user-service.types';

export const UserService = new Elysia({ name: 'user/service' })
  .use(UserDomain)
  .derive({ as: 'global' }, function deriveUserService({ userDomain }) {
    const userService = {
      create: ({ user }: CreateParams) => {
        return userDomain.create({ user });
      },
      delete: ({ userId }: DeleteParams) => {
        return userDomain.delete({ userId });
      },
      find: () => {
        return userDomain.find();
      },
      findById: ({ userId }: FindByIdParams) => {
        return userDomain.findById({ userId });
      },
      update: ({ user, userId }: UpdateParams) => {
        return userDomain.update({
          user,
          userId,
        });
      },
    };

    return { userService };
  });
