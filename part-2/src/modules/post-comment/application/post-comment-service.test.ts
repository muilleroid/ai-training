import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { NotFoundError } from 'core/errors';

import type { Comment, TCommentDomain } from 'modules/comment/domain/types';
import type { TPostDomain } from 'modules/post/domain/types';

import { postCommentServiceFactory } from './post-comment.service';

const commentMock: Comment = {
  body: 'body',
  id: createId(),
  postId: createId(),
  userId: createId(),
};

describe('post-comment', () => {
  describe('PostCommentService', () => {
    const commentDomain = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TCommentDomain;

    const postDomain = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TPostDomain;

    const postCommentService = postCommentServiceFactory({
      commentDomain,
      postDomain,
    });

    describe('findByPostId', () => {
      it('throws an error if post does not exist', () => {
        const postId = createId();

        postDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await postCommentService.findByPostId({ postId });

          expect(postDomain.exists).toHaveBeenCalledWith({ postId });
          expect(commentDomain.find).not.toHaveBeenCalledWith({ postId });
        }).toThrowError(NotFoundError);
      });

      it('returns an array of comments if post exists', async () => {
        const postId = createId();

        const comments = [
          { ...commentMock, id: createId(), postId },
          { ...commentMock, id: createId(), postId },
        ];

        postDomain.exists.mockResolvedValueOnce(true);
        commentDomain.find.mockResolvedValueOnce(comments);

        const result = await postCommentService.findByPostId({ postId });

        expect(postDomain.exists).toHaveBeenCalledWith({ postId });
        expect(commentDomain.find).toHaveBeenCalledWith({ postId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });
    });
  });
});
