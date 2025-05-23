import { beforeEach, describe, expect, it } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { db } from 'core/infrastructure/database';
import { postSchema } from 'modules/post/infrastructure/schemas';
import { companySchema, userSchema } from 'modules/user/infrastructure/schemas';

import { request } from '../../helpers';

describe('/posts', () => {
  const postId = createId();
  const userId = createId();

  beforeEach(async () => {
    const companyId = createId();

    await db.transaction(async (tx) => {
      await db.insert(companySchema).values({
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

      await tx.insert(postSchema).values({
        body: 'body',
        id: postId,
        title: 'title',
        userId,
      });
    });
  });

  describe('/posts (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: '/posts' });

      expect(status).toBe(401);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/posts',
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [post] = data;

      expect(post).toEqual({
        body: 'body',
        id: postId,
        title: 'title',
        userId,
      });
    });

    it('should return 200 with userId filter (not existent)', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/posts',
        query: { userId: createId() },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(0);
    });

    it('should return 200 with userId filter (not existent)', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/posts',
        query: { userId },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [post] = data;

      expect(post).toEqual({
        body: 'body',
        id: postId,
        title: 'title',
        userId,
      });
    });
  });

  describe('/posts (POST)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'POST',
        path: '/posts',
        payload: {
          body: 'body',
          title: 'title',
          userId,
        },
      });

      expect(status).toBe(401);
    });

    it('should return 409', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'POST',
        path: '/posts',
        payload: {
          body: 'body',
          title: 'title',
          userId: createId(),
        },
      });

      expect(status).toBe(409);
    });

    it('should return 201', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'POST',
        path: '/posts',
        payload: {
          body: 'body',
          title: 'title',
          userId,
        },
      });

      expect(status).toBe(201);

      expect(data).toEqual({
        body: 'body',
        id: expect.any(String),
        title: 'title',
        userId,
      });
    });
  });

  describe('/posts/:postId (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: `/posts/${postId}` });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        path: `/posts/${createId()}`,
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: `/posts/${postId}`,
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'body',
        id: postId,
        title: 'title',
        userId,
      });
    });
  });

  describe('/posts/:postId (PUT)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'PUT',
        path: `/posts/${postId}`,
        payload: {
          body: 'updated',
          title: 'title',
        },
      });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'PUT',
        path: `/posts/${createId()}`,
        payload: {
          body: 'updated',
          title: 'title',
        },
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'PUT',
        path: `/posts/${postId}`,
        payload: {
          body: 'updated',
          title: 'title',
        },
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'updated',
        id: postId,
        title: 'title',
        userId,
      });
    });
  });

  describe('/posts/:postId (PATCH)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'PATCH',
        path: `/posts/${postId}`,
        payload: {
          body: 'updated',
        },
      });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'PATCH',
        path: `/posts/${createId()}`,
        payload: {
          body: 'updated',
        },
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'PATCH',
        path: `/posts/${postId}`,
        payload: {
          body: 'updated',
        },
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'updated',
        id: postId,
        title: 'title',
        userId,
      });
    });
  });

  describe('/posts/:postId (DELETE)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'DELETE',
        path: `/posts/${postId}`,
      });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'DELETE',
        path: `/posts/${createId()}`,
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'DELETE',
        path: `/posts/${postId}`,
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'body',
        id: postId,
        title: 'title',
        userId,
      });
    });
  });
});
