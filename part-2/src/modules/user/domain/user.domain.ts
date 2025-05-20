import { Elysia } from 'elysia';

import { userRepository } from '../infrastructure/repositories';

export const userDomain = new Elysia({ name: 'user/domain' })
  .use(userRepository)
  .resolve({ as: 'global' }, ({ userRepository }) => {
    return {
      userDomain: {
        find: () => {
          return userRepository.find();
        },
      },
    };
  });
