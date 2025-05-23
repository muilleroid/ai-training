import { beforeEach, describe, expect, it } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { db } from 'core/infrastructure/database';
import { addressSchema, companySchema, userSchema } from 'modules/user/infrastructure/schemas';

import { request } from '../../helpers';

describe('/users', () => {
  const userId = createId();

  beforeEach(async () => {
    const companyId = createId();

    await db.transaction(async (tx) => {
      await tx.insert(companySchema).values({
        bs: 'bs',
        catchPhrase: 'catchPhrase',
        id: companyId,
        name: 'name',
      });
      await tx.insert(userSchema).values({
        companyId,
        email: 'user@mail.com',
        id: userId,
        name: 'name',
        phone: '1-770-736-8031',
        username: 'username',
        website: 'https://website.com',
      });
      await tx.insert(addressSchema).values({
        city: 'city',
        lat: '40.7128',
        lng: '-74.0060',
        street: 'street',
        suite: 'suite',
        userId,
        zipcode: '92998-3874',
      });
    });
  });

  describe('/ (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: '/users/' });

      expect(status).toEqual(401);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/users/',
      });

      expect(status).toEqual(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [user] = data;

      expect(user).toEqual({
        address: {
          city: 'city',
          geo: {
            lat: '40.7128',
            lng: '-74.0060',
          },
          street: 'street',
          suite: 'suite',
          zipcode: '92998-3874',
        },
        company: {
          bs: 'bs',
          catchPhrase: 'catchPhrase',
          name: 'name',
        },
        email: 'user@mail.com',
        id: userId,
        name: 'name',
        phone: '1-770-736-8031',
        username: 'username',
        website: 'https://website.com',
      });
    });
  });

  describe('/ (POST)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'POST',
        path: '/users/',
        payload: {
          address: {
            city: 'city',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
            street: 'street',
            suite: 'suite',
            zipcode: '92998-3874',
          },
          company: {
            bs: 'bs',
            catchPhrase: 'catchPhrase',
            name: 'name',
          },
          email: 'user+1@mail.com',
          name: 'name',
          phone: '1-770-736-8031',
          username: 'username1',
          website: 'https://website.com',
        },
      });

      expect(status).toEqual(401);
    });

    it('should return 409', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'POST',
        path: '/users/',
        payload: {
          address: {
            city: 'city',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
            street: 'street',
            suite: 'suite',
            zipcode: '92998-3874',
          },
          company: {
            bs: 'bs',
            catchPhrase: 'catchPhrase',
            name: 'name',
          },
          email: 'user@mail.com',
          name: 'name',
          phone: '1-770-736-8031',
          username: 'username',
          website: 'https://website.com',
        },
      });

      expect(status).toEqual(409);
    });

    it('should return 201', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'POST',
        path: '/users/',
        payload: {
          address: {
            city: 'city',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
            street: 'street',
            suite: 'suite',
            zipcode: '92998-3874',
          },
          company: {
            bs: 'bs',
            catchPhrase: 'catchPhrase',
            name: 'name',
          },
          email: 'user+1@mail.com',
          name: 'name',
          phone: '1-770-736-8031',
          username: 'username1',
          website: 'https://website.com',
        },
      });

      expect(status).toEqual(201);

      expect(data).toEqual({
        address: {
          city: 'city',
          geo: {
            lat: '40.7128',
            lng: '-74.0060',
          },
          street: 'street',
          suite: 'suite',
          zipcode: '92998-3874',
        },
        company: {
          bs: 'bs',
          catchPhrase: 'catchPhrase',
          name: 'name',
        },
        email: 'user+1@mail.com',
        id: expect.any(String),
        name: 'name',
        phone: '1-770-736-8031',
        username: 'username1',
        website: 'https://website.com',
      });
    });
  });

  describe('/:userId (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: `/users/${userId}` });

      expect(status).toEqual(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        path: `/users/${createId()}`,
      });

      expect(status).toEqual(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: `/users/${userId}`,
      });

      expect(status).toEqual(200);

      expect(data).toEqual({
        address: {
          city: 'city',
          geo: {
            lat: '40.7128',
            lng: '-74.0060',
          },
          street: 'street',
          suite: 'suite',
          zipcode: '92998-3874',
        },
        company: {
          bs: 'bs',
          catchPhrase: 'catchPhrase',
          name: 'name',
        },
        email: 'user@mail.com',
        id: userId,
        name: 'name',
        phone: '1-770-736-8031',
        username: 'username',
        website: 'https://website.com',
      });
    });
  });

  describe('/:userId (PUT)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'PUT',
        path: `/users/${userId}`,
        payload: {
          address: {
            city: 'city',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
            street: 'street',
            suite: 'suite',
            zipcode: '92998-3874',
          },
          company: {
            bs: 'bs',
            catchPhrase: 'catchPhrase',
            name: 'name',
          },
          email: 'user@mail.com',
          name: 'name',
          phone: '1-770-736-8031',
          username: 'username',
          website: 'https://website.com',
        },
      });

      expect(status).toEqual(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'PUT',
        path: `/users/${createId()}`,
        payload: {
          address: {
            city: 'city',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
            street: 'street',
            suite: 'suite',
            zipcode: '92998-3874',
          },
          company: {
            bs: 'bs',
            catchPhrase: 'catchPhrase',
            name: 'name',
          },
          email: 'user@mail.com',
          name: 'name',
          phone: '1-770-736-8031',
          username: 'username',
          website: 'https://website.com',
        },
      });

      expect(status).toEqual(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'PUT',
        path: `/users/${userId}`,
        payload: {
          address: {
            city: 'city',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
            street: 'street',
            suite: 'updated',
            zipcode: '92998-3874',
          },
          company: {
            bs: 'bs',
            catchPhrase: 'catchPhrase',
            name: 'updated',
          },
          email: 'user@mail.com',
          name: 'updated',
          phone: '1-770-736-8031',
          username: 'username',
          website: 'https://website.com',
        },
      });

      expect(status).toEqual(200);

      expect(data).toEqual({
        address: {
          city: 'city',
          geo: {
            lat: '40.7128',
            lng: '-74.0060',
          },
          street: 'street',
          suite: 'updated',
          zipcode: '92998-3874',
        },
        company: {
          bs: 'bs',
          catchPhrase: 'catchPhrase',
          name: 'updated',
        },
        email: 'user@mail.com',
        id: userId,
        name: 'updated',
        phone: '1-770-736-8031',
        username: 'username',
        website: 'https://website.com',
      });
    });
  });

  describe('/:userId (PATCH)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'PATCH',
        path: `/users/${userId}`,
        payload: {
          name: 'name',
        },
      });

      expect(status).toEqual(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'PATCH',
        path: `/users/${createId()}`,
        payload: {
          name: 'name',
        },
      });

      expect(status).toEqual(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'PATCH',
        path: `/users/${userId}`,
        payload: {
          address: {
            suite: 'updated',
          },
          company: {
            name: 'updated',
          },
          name: 'updated',
        },
      });

      expect(status).toEqual(200);

      expect(data).toEqual({
        address: {
          city: 'city',
          geo: {
            lat: '40.7128',
            lng: '-74.0060',
          },
          street: 'street',
          suite: 'updated',
          zipcode: '92998-3874',
        },
        company: {
          bs: 'bs',
          catchPhrase: 'catchPhrase',
          name: 'updated',
        },
        email: 'user@mail.com',
        id: userId,
        name: 'updated',
        phone: '1-770-736-8031',
        username: 'username',
        website: 'https://website.com',
      });
    });
  });

  describe('/:userId (DELETE)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'DELETE',
        path: `/users/${userId}`,
      });

      expect(status).toEqual(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'DELETE',
        path: `/users/${createId()}`,
      });

      expect(status).toEqual(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'DELETE',
        path: `/users/${userId}`,
      });

      expect(status).toEqual(200);

      expect(data).toEqual({
        address: {
          city: 'city',
          geo: {
            lat: '40.7128',
            lng: '-74.0060',
          },
          street: 'street',
          suite: 'suite',
          zipcode: '92998-3874',
        },
        company: {
          bs: 'bs',
          catchPhrase: 'catchPhrase',
          name: 'name',
        },
        email: 'user@mail.com',
        id: userId,
        name: 'name',
        phone: '1-770-736-8031',
        username: 'username',
        website: 'https://website.com',
      });
    });
  });
});
