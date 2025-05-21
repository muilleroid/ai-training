import { Elysia } from 'elysia';

import { userDomain } from '../domain';

import type { CreateParams, DeleteParams, FindByIdParams, UpdateParams } from './user-service.types';

export const userService = new Elysia({ name: 'user/service' })
  .use(userDomain)
  .resolve({ as: 'global' }, ({ userDomain }) => {
    const service = {
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

    return { userService: service };
  });
