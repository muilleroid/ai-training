import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { NotFoundError } from 'core/errors';

import type { CreateCommentInput, TCommentDomain } from '../domain/types';

import { commentServiceFactory } from './comment.service';

const commentInputMock: CreateCommentInput = {
  body: 'body',
  postId: createId(),
  userId: createId(),
};

describe('comment', () => {
  describe('CommentService', () => {
    const commentDomain = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TCommentDomain;

    const commentService = commentServiceFactory({ commentDomain });

    describe('create', () => {
      it('returns a comment', async () => {
        commentDomain.create.mockResolvedValueOnce({
          ...commentInputMock,
          id: createId(),
        });

        const result = await commentService.create({ comment: commentInputMock });

        expect(commentDomain.create).toHaveBeenCalledWith({ comment: commentInputMock });

        expect(result).toEqual({
          ...commentInputMock,
          id: expect.any(String),
        });
      });
    });

    describe('delete', () => {
      it('throws an error if comment does not exist', () => {
        const commentId = createId();

        commentDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await commentService.delete({ commentId });

          expect(commentDomain.exists).toHaveBeenCalledWith({ commentId });
          expect(commentDomain.delete).not.toHaveBeenCalledWith({ commentId });
        }).toThrowError(NotFoundError);
      });

      it('returns a comment if comment exists', async () => {
        const commentId = createId();

        commentDomain.exists.mockResolvedValueOnce(true);
        commentDomain.delete.mockResolvedValueOnce({
          ...commentInputMock,
          id: commentId,
        });

        const result = await commentService.delete({ commentId });

        expect(commentDomain.exists).toHaveBeenCalledWith({ commentId });
        expect(commentDomain.delete).toHaveBeenCalledWith({ commentId });

        expect(result).toEqual({
          ...commentInputMock,
          id: commentId,
        });
      });
    });

    describe('find', () => {
      it('returns an array of comments', async () => {
        const comments = [
          { ...commentInputMock, id: createId() },
          { ...commentInputMock, id: createId() },
        ];

        commentDomain.find.mockResolvedValueOnce(comments);

        const result = await commentService.find();

        expect(commentDomain.find).toHaveBeenCalled();

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });

      it('returns an array of comments filtered by userId', async () => {
        const userId = createId();
        const comments = [
          { ...commentInputMock, id: createId(), userId },
          { ...commentInputMock, id: createId(), userId },
        ];

        commentDomain.find.mockResolvedValueOnce(comments);

        const result = await commentService.find({ userId });

        expect(commentDomain.find).toHaveBeenCalledWith({ userId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });

      it('returns an array of comments filtered by postId', async () => {
        const postId = createId();
        const comments = [
          { ...commentInputMock, id: createId(), postId },
          { ...commentInputMock, id: createId(), postId },
        ];

        commentDomain.find.mockResolvedValueOnce(comments);

        const result = await commentService.find({ postId });

        expect(commentDomain.find).toHaveBeenCalledWith({ postId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });

      it('returns comments filtered by postId and userId', async () => {
        const postId = createId();
        const userId = createId();

        const comments = [
          { ...commentInputMock, id: createId(), postId, userId },
          { ...commentInputMock, id: createId(), postId, userId },
        ];

        commentDomain.find.mockResolvedValueOnce(comments);

        const result = await commentService.find({ postId, userId });

        expect(commentDomain.find).toHaveBeenCalledWith({ postId, userId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });
    });

    describe('findById', () => {
      it('throws an error if comment does not exist', () => {
        const commentId = createId();

        commentDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await commentService.findById({ commentId });

          expect(commentDomain.exists).toHaveBeenCalledWith({ commentId });
          expect(commentDomain.findById).not.toHaveBeenCalledWith({ commentId });
        }).toThrowError(NotFoundError);
      });

      it('returns a comment if comment exists', async () => {
        const commentId = createId();

        commentDomain.exists.mockResolvedValueOnce(true);
        commentDomain.findById.mockResolvedValueOnce({
          ...commentInputMock,
          id: commentId,
        });

        const result = await commentService.findById({ commentId });

        expect(commentDomain.exists).toHaveBeenCalledWith({ commentId });
        expect(commentDomain.findById).toHaveBeenCalledWith({ commentId });

        expect(result).toEqual({
          ...commentInputMock,
          id: commentId,
        });
      });
    });

    describe('update', () => {
      it('throws an error if comment does not exist', () => {
        const commentId = createId();

        const updatedComment = {
          ...commentInputMock,
          body: 'updated',
        };

        commentDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await commentService.update({ comment: updatedComment, commentId });

          expect(commentDomain.exists).toHaveBeenCalledWith({ commentId });
          expect(commentDomain.update).not.toHaveBeenCalledWith({
            comment: updatedComment,
            commentId,
          });
        }).toThrowError(NotFoundError);
      });

      it('returns an updated comment if comment exists', async () => {
        const commentId = createId();

        const updatedComment = {
          ...commentInputMock,
          body: 'updated',
        };

        commentDomain.exists.mockResolvedValueOnce(true);
        commentDomain.update.mockResolvedValueOnce({
          ...updatedComment,
          id: commentId,
        });

        const result = await commentService.update({ comment: updatedComment, commentId });

        expect(commentDomain.exists).toHaveBeenCalledWith({ commentId });
        expect(commentDomain.update).toHaveBeenCalledWith({
          comment: updatedComment,
          commentId,
        });

        expect(result).toEqual({
          ...commentInputMock,
          ...updatedComment,
          id: commentId,
        });
      });
    });
  });
});
