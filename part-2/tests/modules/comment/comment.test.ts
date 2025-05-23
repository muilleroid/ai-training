import { beforeEach, describe, expect, it } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { db } from 'core/infrastructure/database';
import { commentSchema } from 'modules/comment/infrastructure/schemas';
import { postSchema } from 'modules/post/infrastructure/schemas';
import { companySchema, userSchema } from 'modules/user/infrastructure/schemas';

import { request } from '../../helpers';

describe('/comments', () => {
  const commentId = createId();
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

      await tx.insert(commentSchema).values({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });
  });

  describe('/ (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: '/comments' });

      expect(status).toBe(401);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/comments',
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [comment] = data;

      expect(comment).toEqual({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });

    it('should return 200 with postId filter (not existent)', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/comments',
        query: { postId: createId() },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(0);
    });

    it('should return 200 with postId filter (existent)', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/comments',
        query: { postId },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [comment] = data;

      expect(comment).toEqual({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });

    it('should return 200 with userId filter (not existent)', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/comments',
        query: { userId: createId() },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(0);
    });

    it('should return 200 with userId filter (existent)', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/comments',
        query: { userId },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [comment] = data;

      expect(comment).toEqual({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });

    it('should return 200 with userId and postId filter', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: '/comments',
        query: {
          postId,
          userId,
        },
      });

      expect(status).toBe(200);

      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(1);

      const [comment] = data;

      expect(comment).toEqual({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });
  });

  describe('/ (POST)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'POST',
        path: '/comments',
        payload: {
          body: 'body',
          postId,
          userId,
        },
      });

      expect(status).toBe(401);
    });

    it('should return 409', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'POST',
        path: '/comments',
        payload: {
          body: 'body',
          postId: createId(),
          userId: createId(),
        },
      });

      expect(status).toBe(409);
    });

    it('should return 201', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'POST',
        path: '/comments',
        payload: {
          body: 'body',
          postId,
          userId,
        },
      });

      expect(status).toBe(201);

      expect(data).toEqual({
        body: 'body',
        id: expect.any(String),
        postId,
        userId,
      });
    });
  });

  describe('/:commentId (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: `/comments/${commentId}` });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        path: `/comments/${createId()}`,
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: `/comments/${commentId}`,
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });
  });

  describe('/:commentId (PUT)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'PUT',
        path: `/comments/${commentId}`,
        payload: { body: 'updated' },
      });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'PUT',
        path: `/comments/${createId()}`,
        payload: { body: 'updated' },
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'PUT',
        path: `/comments/${commentId}`,
        payload: { body: 'updated' },
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'updated',
        id: commentId,
        postId,
        userId,
      });
    });
  });

  describe('/:commentId (PATCH)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'PATCH',
        path: `/comments/${commentId}`,
        payload: { body: 'updated' },
      });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'PATCH',
        path: `/comments/${createId()}`,
        payload: { body: 'updated' },
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'PATCH',
        path: `/comments/${commentId}`,
        payload: { body: 'updated' },
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'updated',
        id: commentId,
        postId,
        userId,
      });
    });
  });

  describe('/:commentId (DELETE)', () => {
    it('should return 401', async () => {
      const { status } = await request({
        method: 'DELETE',
        path: `/comments/${commentId}`,
      });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        method: 'DELETE',
        path: `/comments/${createId()}`,
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        method: 'DELETE',
        path: `/comments/${commentId}`,
      });

      expect(status).toBe(200);

      expect(data).toEqual({
        body: 'body',
        id: commentId,
        postId,
        userId,
      });
    });
  });
});
