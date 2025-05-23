import { beforeAll, beforeEach, describe, expect, it } from 'bun:test';

import { db } from 'core/infrastructure/database';
import { accountSchema } from 'modules/auth/infrastructure/schemas';

import { accountId } from '../../constants';
import { request } from '../../helpers';

describe('/auth', () => {
  let passwordHash: string;

  beforeAll(async () => {
    passwordHash = await Bun.password.hash('Asdf1234', { algorithm: 'bcrypt' });
  });

  beforeEach(async () => {
    await db.insert(accountSchema).values({
      email: 'admin@mail.com',
      id: accountId,
      name: 'Admin',
      passwordHash,
    });
  });

  describe('/me (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: '/auth/me' });

      expect(status).toEqual(401);
    });

    it('should return 200 for authenticated user', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/auth/me',
      });

      expect(status).toEqual(200);

      const { id, ...sanitizedAccount } = data;

      expect(sanitizedAccount).toEqual({
        email: 'admin@mail.com',
        name: 'Admin',
      });
    });
  });

  describe('/sign-in (POST)', () => {
    it('should return 401 if account not found', async () => {
      const { status } = await request({
        method: 'POST',
        path: '/auth/sign-in',
        payload: {
          email: 'user@mail.com',
          password: 'Asdf1234',
        },
      });

      expect(status).toEqual(401);
    });

    it('should return 200 for valid credentials', async () => {
      const { data, status } = await request({
        method: 'POST',
        path: '/auth/sign-in',
        payload: {
          email: 'admin@mail.com',
          password: 'Asdf1234',
        },
      });

      expect(status).toEqual(200);

      expect(data).toHaveProperty('account');
      expect(data).toHaveProperty('token');

      const { account, token } = data;
      const { id, ...sanitizedAccount } = account;

      expect(sanitizedAccount).toEqual({
        email: 'admin@mail.com',
        name: 'Admin',
      });

      expect(typeof token).toEqual('string');
    });
  });

  describe('/sign-up (POST)', () => {
    it('should return 409', async () => {
      const { status } = await request({
        method: 'POST',
        path: '/auth/sign-up',
        payload: {
          email: 'admin@mail.com',
          name: 'Admin',
          password: 'Asdf1234',
        },
      });

      expect(status).toEqual(409);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        method: 'POST',
        path: '/auth/sign-up',
        payload: {
          email: 'admin+1@mail.com',
          name: 'Admin',
          password: 'Asdf1234',
        },
      });

      expect(status).toEqual(200);

      expect(data).toHaveProperty('account');
      expect(data).toHaveProperty('token');

      const { account, token } = data;
      const { id, ...sanitizedAccount } = account;

      expect(sanitizedAccount).toEqual({
        email: 'admin+1@mail.com',
        name: 'Admin',
      });

      expect(typeof token).toEqual('string');
    });
  });
});
