import { Elysia } from 'elysia';

import { setup } from 'core/setup';

import type { UserRepository } from 'modules/user/domain/types';

import { userSchema } from '../schemas';

import { toUserList } from './user-repository.mapper';

export const userRepository = new Elysia({ name: 'user/repository' })
  .use(setup)
  .resolve({ as: 'global' }, ({ connection }) => {
    const repository: UserRepository = {
      find: async () => {
        const users = await connection.select().from(userSchema);

        return toUserList(users);
      },
    };

    return { userRepository: repository };
  });
