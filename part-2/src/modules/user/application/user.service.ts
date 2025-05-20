import { Elysia } from 'elysia';

import { userDomain } from '../domain';

export const userService = new Elysia({ name: 'user/service' })
  .use(userDomain)
  .resolve({ as: 'global' }, ({ userDomain }) => {
    return {
      userService: {
        find: () => {
          return userDomain.find();
        },
      },
    };
  });
