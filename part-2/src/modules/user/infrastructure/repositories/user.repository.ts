import { Elysia } from 'elysia';
import { eq } from 'drizzle-orm';

import { setup } from 'core/setup';

import type { UserRepository } from 'modules/user/domain/types';

import { addressSchema, companySchema, geoSchema, userSchema } from '../schemas';

import { toUserList } from './user-repository.mapper';

export const userRepository = new Elysia({ name: 'user/repository' })
  .use(setup)
  .resolve({ as: 'global' }, ({ connection }) => {
    const repository: UserRepository = {
      find: async () => {
        const users = await connection
          .select()
          .from(userSchema)
          .leftJoin(addressSchema, eq(userSchema.addressId, addressSchema.id))
          .leftJoin(geoSchema, eq(addressSchema.geoId, geoSchema.id))
          .leftJoin(companySchema, eq(userSchema.companyId, companySchema.id));

        return toUserList(users);
      },
    };

    return { userRepository: repository };
  });
