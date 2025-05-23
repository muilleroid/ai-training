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

  describe('/me (GET)', () => {
    beforeEach(async () => {
      await db.insert(accountSchema).values({
        email: 'admin@gmail.com',
        id: accountId,
        name: 'Admin',
        passwordHash,
      });
    });

    it('should return 401 if not authenticated', async () => {
      const { status } = await request({ path: '/auth/me' });

      expect(status).toEqual(401);
    });

    it('should return 200 for authenticated user', async () => {
      const { status } = await request({
        authenticated: true,
        path: '/auth/me',
      });

      expect(status).toEqual(200);
    });
  });

  describe('/sign-in (POST)', () => {
    beforeEach(async () => {
      await db.insert(accountSchema).values({
        email: 'admin@gmail.com',
        name: 'Admin',
        passwordHash,
      });
    });

    it('should return 401 if account not found', async () => {
      const { status } = await request({
        method: 'POST',
        path: '/auth/sign-in',
        payload: {
          email: 'user@gmail.com',
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
          email: 'admin@gmail.com',
          password: 'Asdf1234',
        },
      });

      expect(status).toEqual(200);

      expect(data).toHaveProperty('account');
      expect(data).toHaveProperty('token');

      const { account, token } = data;

      expect(account.email).toEqual('admin@gmail.com');
      expect(account.name).toEqual('Admin');

      expect(typeof token).toEqual('string');
    });
  });

  describe('/sign-up (POST)', () => {
    it('should return 200', async () => {
      const { data, status } = await request({
        method: 'POST',
        path: '/auth/sign-up',
        payload: {
          email: 'admin@gmail.com',
          name: 'Admin',
          password: 'Asdf1234',
        },
      });

      expect(status).toEqual(200);

      expect(data).toHaveProperty('account');
      expect(data).toHaveProperty('token');

      const { account, token } = data;

      expect(account.email).toEqual('admin@gmail.com');
      expect(account.name).toEqual('Admin');

      expect(typeof token).toEqual('string');
    });
  });
});
