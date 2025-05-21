import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import omitEmpty from 'omit-empty-es';

import { setup } from 'core/setup';

import type { TUserRepository } from 'modules/user/domain/types';

import { addressSchema, companySchema, userSchema } from '../schemas';

import { toUser, toUserList } from './user-repository.mapper';

export const UserRepository = new Elysia({ name: 'user/repository' })
  .use(setup)
  .resolve({ as: 'global' }, ({ connection }) => {
    const userRepository: TUserRepository = {
      create: async ({ user }) => {
        const { address, company } = user;
        const { geo } = address;

        const userId = await connection.transaction(async (tx) => {
          const [createdCompany] = await tx
            .insert(companySchema)
            .values({
              bs: company.bs,
              catchPhrase: company.catchPhrase,
              name: company.name,
            })
            .returning({ id: companySchema.id });

          const [createdUser] = await tx
            .insert(userSchema)
            .values({
              companyId: createdCompany.id,
              email: user.email,
              name: user.name,
              phone: user.phone,
              username: user.username,
              website: user.website,
            })
            .returning({ id: userSchema.id });

          await tx.insert(addressSchema).values({
            city: address.city,
            lat: geo.lat,
            lng: geo.lng,
            street: address.street,
            suite: address.suite,
            userId: createdUser.id,
            zipcode: address.zipcode,
          });

          return createdUser.id;
        });

        return userRepository.findById({ userId });
      },
      delete: async ({ userId }) => {
        const user = await userRepository.findById({ userId });

        await connection.delete(userSchema).where(eq(userSchema.id, userId)).returning();

        return user;
      },
      find: async () => {
        const users = await connection
          .select()
          .from(userSchema)
          .leftJoin(addressSchema, eq(userSchema.id, addressSchema.userId))
          .leftJoin(companySchema, eq(userSchema.companyId, companySchema.id));

        return toUserList(users);
      },
      findById: async ({ userId }) => {
        const [user] = await connection
          .select()
          .from(userSchema)
          .where(eq(userSchema.id, userId))
          .leftJoin(addressSchema, eq(userSchema.id, addressSchema.userId))
          .leftJoin(companySchema, eq(userSchema.companyId, companySchema.id))
          .limit(1);

        return toUser(user);
      },
      update: async ({ user, userId }) => {
        const { address, company } = user;

        const updated = await connection.transaction(async (tx) => {
          const [foundUser] = await tx
            .select({ companyId: userSchema.companyId })
            .from(userSchema)
            .where(eq(userSchema.id, userId))
            .limit(1);

          if (!foundUser) {
            return false;
          }

          const { companyId } = foundUser;

          if (address) {
            const addressUpdates = omitEmpty<object>({
              city: address.city,
              street: address.street,
              suite: address.suite,
              zipcode: address.zipcode,
              ...(address.geo && {
                lat: address.geo.lat,
                lng: address.geo.lng,
              }),
            });

            if (Object.keys(addressUpdates).length > 0) {
              await tx.update(addressSchema).set(addressUpdates).where(eq(addressSchema.userId, userId));
            }
          }

          if (company) {
            const companyUpdates = omitEmpty<object>({
              bs: company.bs,
              catchPhrase: company.catchPhrase,
              name: company.name,
            });

            if (Object.keys(companyUpdates).length > 0) {
              await tx.update(companySchema).set(companyUpdates).where(eq(companySchema.id, companyId));
            }
          }

          const userUpdates = omitEmpty<object>({
            email: user.email,
            name: user.name,
            phone: user.phone,
            username: user.username,
            website: user.website,
          });

          if (Object.keys(userUpdates).length > 0) {
            await tx.update(userSchema).set(userUpdates).where(eq(userSchema.id, userId));
          }

          return true;
        });

        if (!updated) {
          return null;
        }

        return userRepository.findById({ userId });
      },
    };

    return { userRepository };
  });
