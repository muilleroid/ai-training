import { afterAll, afterEach, beforeAll } from 'bun:test';
import { sql } from 'drizzle-orm';

import { db } from 'core/infrastructure/database';
import { accountSchema } from 'modules/auth/infrastructure/schemas';
import { commentSchema } from 'modules/comment/infrastructure/schemas';
import { postSchema } from 'modules/post/infrastructure/schemas';
import { addressSchema, companySchema, userSchema } from 'modules/user/infrastructure/schemas';

import { appFactory } from 'app.factory';

import { accountId } from './constants';
import { signJwt } from './helpers';

/* eslint-disable import/no-mutable-exports */
export let app: ReturnType<typeof appFactory>;
export let authToken: string;
/* eslint-enable import/no-mutable-exports */

beforeAll(async () => {
  app = appFactory();
  authToken = await signJwt({ id: accountId });
});

afterAll(() => {
  app.stop();
});

afterEach(async () => {
  await db.execute(sql`
    BEGIN TRANSACTION ;

    TRUNCATE TABLE ${accountSchema} CASCADE;
    TRUNCATE TABLE ${addressSchema} CASCADE;
    TRUNCATE TABLE ${commentSchema} CASCADE;
    TRUNCATE TABLE ${companySchema} CASCADE;
    TRUNCATE TABLE ${postSchema} CASCADE;
    TRUNCATE TABLE ${userSchema} CASCADE;

    COMMIT TRANSACTION;
  `);
});
