import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import type { CreateCommentInput, TCommentRepository } from './types';
import { commentDomainFactory } from './comment.domain';

const commentInputMock: CreateCommentInput = {
  body: 'body',
  postId: createId(),
  userId: createId(),
};

describe('comment', () => {
  describe('CommentDomain', () => {
    const commentRepository = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TCommentRepository;

    const commentDomain = commentDomainFactory({ commentRepository });

    describe('create', () => {
      it('returns a comment', async () => {
        commentRepository.create.mockResolvedValueOnce({
          ...commentInputMock,
          id: createId(),
        });

        const result = await commentDomain.create({ comment: commentInputMock });

        expect(commentRepository.create).toHaveBeenCalledWith({ comment: commentInputMock });

        expect(result).toEqual({
          ...commentInputMock,
          id: expect.any(String),
        });
      });
    });

    describe('delete', () => {
      it('returns a comment', async () => {
        const commentId = createId();

        commentRepository.delete.mockResolvedValueOnce({
          ...commentInputMock,
          id: commentId,
        });

        const result = await commentDomain.delete({ commentId });

        expect(commentRepository.delete).toHaveBeenCalledWith({ commentId });

        expect(result).toEqual({
          ...commentInputMock,
          id: commentId,
        });
      });
    });

    describe('exists', () => {
      it('returns true if comment exists', async () => {
        const commentId = createId();

        commentRepository.exists.mockResolvedValueOnce(true);

        const result = await commentDomain.exists({ commentId });

        expect(commentRepository.exists).toHaveBeenCalledWith({ commentId });

        expect(result).toEqual(true);
      });

      it('returns false if comment does not exist', async () => {
        const commentId = createId();

        commentRepository.exists.mockResolvedValueOnce(false);

        const result = await commentDomain.exists({ commentId });

        expect(commentRepository.exists).toHaveBeenCalledWith({ commentId });

        expect(result).toEqual(false);
      });
    });

    describe('find', () => {
      it('returns an array of comments', async () => {
        const comments = [
          { ...commentInputMock, id: createId() },
          { ...commentInputMock, id: createId() },
        ];

        commentRepository.find.mockResolvedValueOnce(comments);

        const result = await commentDomain.find();

        expect(commentRepository.find).toHaveBeenCalled();

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });

      it('returns comments filtered by userId', async () => {
        const userId = createId();

        const comments = [
          { ...commentInputMock, id: createId(), userId },
          { ...commentInputMock, id: createId(), userId },
        ];

        commentRepository.find.mockResolvedValueOnce(comments);

        const result = await commentDomain.find({ userId });

        expect(commentRepository.find).toHaveBeenCalledWith({ userId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });

      it('returns comments filtered by postId', async () => {
        const postId = createId();

        const comments = [
          { ...commentInputMock, id: createId(), postId },
          { ...commentInputMock, id: createId(), postId },
        ];

        commentRepository.find.mockResolvedValueOnce(comments);

        const result = await commentDomain.find({ postId });

        expect(commentRepository.find).toHaveBeenCalledWith({ postId });

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

        commentRepository.find.mockResolvedValueOnce(comments);

        const result = await commentDomain.find({ postId, userId });

        expect(commentRepository.find).toHaveBeenCalledWith({ postId, userId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(comments);
      });
    });

    describe('findById', () => {
      it('returns a comment by id', async () => {
        const commentId = createId();

        commentRepository.findById.mockResolvedValueOnce({
          ...commentInputMock,
          id: commentId,
        });

        const result = await commentDomain.findById({ commentId });

        expect(commentRepository.findById).toHaveBeenCalledWith({ commentId });

        expect(result).toEqual({
          ...commentInputMock,
          id: commentId,
        });
      });
    });

    describe('update', () => {
      it('returns an updated comment', async () => {
        const commentId = createId();

        const updatedComment = {
          ...commentInputMock,
          body: 'updated',
        };

        commentRepository.update.mockResolvedValueOnce({
          ...updatedComment,
          id: commentId,
        });

        const result = await commentDomain.update({
          comment: updatedComment,
          commentId,
        });

        expect(commentRepository.update).toHaveBeenCalledWith({
          comment: updatedComment,
          commentId,
        });

        expect(result).toEqual({
          ...updatedComment,
          id: commentId,
        });
      });
    });
  });
});
