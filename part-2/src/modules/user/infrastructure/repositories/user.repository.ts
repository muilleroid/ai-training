import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import omitEmpty from 'omit-empty-es';

import { setup } from 'core/setup';

import type { UserRepository } from 'modules/user/domain/types';

import { addressSchema, companySchema, geoSchema, userSchema } from '../schemas';

import { toUser, toUserList } from './user-repository.mapper';

export const userRepository = new Elysia({ name: 'user/repository' })
  .use(setup)
  .resolve({ as: 'global' }, ({ connection }) => {
    const repository: UserRepository = {
      create: async ({ user }) => {
        const { address, company } = user;
        const { geo } = address;

        const userId = await connection.transaction(async (tx) => {
          const [createdGeo] = await tx
            .insert(geoSchema)
            .values({
              lat: geo.lat,
              lng: geo.lng,
            })
            .returning({ id: geoSchema.id });

          const [createdAddress] = await tx
            .insert(addressSchema)
            .values({
              city: address.city,
              geoId: createdGeo.id,
              street: address.street,
              suite: address.suite,
              zipcode: address.zipcode,
            })
            .returning({ id: addressSchema.id });

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
              email: user.email,
              name: user.name,
              phone: user.phone,
              username: user.username,
              website: user.website,
              addressId: createdAddress.id,
              companyId: createdCompany.id,
            })
            .returning({ id: userSchema.id });

          return createdUser.id;
        });

        return repository.findById({ userId });
      },
      delete: async ({ userId }) => {
        const user = await repository.findById({ userId });

        await connection.delete(userSchema).where(eq(userSchema.id, userId));

        return user;
      },
      find: async () => {
        const users = await connection
          .select()
          .from(userSchema)
          .leftJoin(addressSchema, eq(userSchema.addressId, addressSchema.id))
          .leftJoin(geoSchema, eq(addressSchema.geoId, geoSchema.id))
          .leftJoin(companySchema, eq(userSchema.companyId, companySchema.id));

        return toUserList(users);
      },
      findById: async ({ userId }) => {
        const [user] = await connection
          .select()
          .from(userSchema)
          .where(eq(userSchema.id, userId))
          .leftJoin(addressSchema, eq(userSchema.addressId, addressSchema.id))
          .leftJoin(geoSchema, eq(addressSchema.geoId, geoSchema.id))
          .leftJoin(companySchema, eq(userSchema.companyId, companySchema.id))
          .limit(1);

        return toUser(user);
      },
      update: async ({ userId, user }) => {
        const { address, company } = user;

        const updated = await connection.transaction(async (tx) => {
          const [foundUser] = await tx
            .select({ companyId: userSchema.companyId, addressId: userSchema.addressId })
            .from(userSchema)
            .where(eq(userSchema.id, userId))
            .limit(1);

          if (!foundUser) {
            return false;
          }

          const { addressId, companyId } = foundUser;

          if (address) {
            const addressUpdates = omitEmpty<object>({
              city: address.city,
              street: address.street,
              suite: address.suite,
              zipcode: address.zipcode,
            });

            if (Object.keys(addressUpdates).length > 0) {
              await tx
                .update(addressSchema)
                .set(address)
                .where(eq(addressSchema.id, addressId))
                .returning({ geoId: addressSchema.geoId });
            }

            const { geo } = address;

            if (geo) {
              const geoUpdates = omitEmpty<object>({
                lat: geo.lat,
                lng: geo.lng,
              });

              if (Object.keys(geoUpdates).length > 0) {
                const [foundAddress] = await tx
                  .select({ geoId: addressSchema.geoId })
                  .from(addressSchema)
                  .where(eq(addressSchema.id, addressId))
                  .limit(1);

                await tx.update(geoSchema).set(geoUpdates).where(eq(geoSchema.id, foundAddress.geoId));
              }
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

        return repository.findById({ userId });
      },
    };

    return { userRepository: repository };
  });
