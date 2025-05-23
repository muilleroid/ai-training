/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/node-postgres';

import { accountSchema } from 'modules/auth/infrastructure/schemas';
import { commentSchema } from 'modules/comment/infrastructure/schemas';
import { postSchema } from 'modules/post/infrastructure/schemas';
import { addressSchema, companySchema, userSchema } from 'modules/user/infrastructure/schemas';

console.log('Seeding database...');

const db = drizzle(Bun.env.DATABASE_URL!);

const usersCount = await db.$count(userSchema);

if (usersCount > 0) {
  console.log('Database already seeded');

  process.exit(0);
}

for (let i = 0; i < 25; i++) {
  await db.transaction(async (tx) => {
    const [{ id: companyId }] = await tx
      .insert(companySchema)
      .values({
        bs: faker.company.buzzPhrase(),
        catchPhrase: faker.company.catchPhrase(),
        name: faker.company.name(),
      })
      .returning({ id: companySchema.id });

    const [{ id: userId }] = await tx
      .insert(userSchema)
      .values({
        companyId,
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number({ style: 'national' }),
        username: `${faker.person.firstName()}${faker.string.numeric(3)}`.toLowerCase(),
        website: faker.internet.url(),
      })
      .returning({ id: userSchema.id });

    await tx.insert(addressSchema).values({
      city: faker.location.city(),
      lat: faker.location.latitude().toString(),
      lng: faker.location.longitude().toString(),
      street: faker.location.street(),
      suite: faker.location.buildingNumber(),
      userId,
      zipcode: faker.location.zipCode({ format: '#####-####' }),
    });

    for (let j = 0; j < 10; j++) {
      const [{ id: postId }] = await tx
        .insert(postSchema)
        .values({
          body: faker.lorem.paragraph(),
          title: faker.lorem.sentence(),
          userId,
        })
        .returning({ id: postSchema.id });

      for (let k = 0; k < 5; k++) {
        await tx.insert(commentSchema).values({
          body: faker.lorem.paragraph(),
          postId,
          userId,
        });
      }
    }
  });
}

const passwordHash = await Bun.password.hash('Asdf1234', { algorithm: 'bcrypt' });

await db.insert(accountSchema).values({
  email: 'admin@mail.com',
  name: 'Admin',
  passwordHash,
});

console.log('Database seeded');

process.exit(0);
