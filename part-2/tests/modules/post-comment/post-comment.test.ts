import { beforeEach, describe, expect, it } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { db } from 'core/infrastructure/database';
import { commentSchema } from 'modules/comment/infrastructure/schemas';
import { postSchema } from 'modules/post/infrastructure/schemas';
import { companySchema, userSchema } from 'modules/user/infrastructure/schemas';

import { request } from '../../helpers';

describe('/posts', () => {
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

  describe('/:postId/comments (GET)', () => {
    it('should return 401', async () => {
      const { status } = await request({ path: `/posts/${postId}/comments` });

      expect(status).toBe(401);
    });

    it('should return 404', async () => {
      const { status } = await request({
        authenticated: true,
        path: `/posts/${createId()}/comments`,
      });

      expect(status).toBe(404);
    });

    it('should return 200', async () => {
      const { data, status } = await request({
        authenticated: true,
        path: `/posts/${postId}/comments`,
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
});
