import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { NotFoundError } from 'core/errors';

import type { CreatePostInput, TPostDomain } from '../domain/types';

import { postServiceFactory } from './post.service';

const postInputMock: CreatePostInput = {
  body: 'body',
  title: 'title',
  userId: createId(),
};

describe('post', () => {
  describe('PostService', () => {
    const postDomain = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TPostDomain;

    const postService = postServiceFactory({ postDomain });

    describe('create', () => {
      it('returns a post', async () => {
        postDomain.create.mockResolvedValueOnce({
          ...postInputMock,
          id: createId(),
        });

        const result = await postService.create({ post: postInputMock });

        expect(postDomain.create).toHaveBeenCalledWith({ post: postInputMock });

        expect(result).toEqual({
          ...postInputMock,
          id: expect.any(String),
        });
      });
    });

    describe('delete', () => {
      it('throws an error if post does not exist', () => {
        const postId = createId();

        postDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await postService.delete({ postId });

          expect(postDomain.exists).toHaveBeenCalledWith({ postId });
          expect(postDomain.delete).not.toHaveBeenCalledWith({ postId });
        }).toThrowError(NotFoundError);
      });

      it('returns a post if post exists', async () => {
        const postId = createId();

        postDomain.exists.mockResolvedValueOnce(true);
        postDomain.delete.mockResolvedValueOnce({
          ...postInputMock,
          id: postId,
        });

        const result = await postService.delete({ postId });

        expect(postDomain.exists).toHaveBeenCalledWith({ postId });
        expect(postDomain.delete).toHaveBeenCalledWith({ postId });

        expect(result).toEqual({
          ...postInputMock,
          id: postId,
        });
      });
    });

    describe('find', () => {
      it('returns an array of posts', async () => {
        const posts = [
          { ...postInputMock, id: createId() },
          { ...postInputMock, id: createId() },
        ];

        postDomain.find.mockResolvedValueOnce(posts);

        const result = await postService.find();

        expect(postDomain.find).toHaveBeenCalled();

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(posts);
      });

      it('returns an array of posts filtered by userId', async () => {
        const userId = createId();
        const posts = [
          { ...postInputMock, id: createId(), userId },
          { ...postInputMock, id: createId(), userId },
        ];

        postDomain.find.mockResolvedValueOnce(posts);

        const result = await postService.find({ userId });

        expect(postDomain.find).toHaveBeenCalledWith({ userId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(posts);
      });
    });

    describe('findById', () => {
      it('throws an error if post does not exist', () => {
        const postId = createId();

        postDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await postService.findById({ postId });

          expect(postDomain.exists).toHaveBeenCalledWith({ postId });
          expect(postDomain.findById).not.toHaveBeenCalledWith({ postId });
        }).toThrowError(NotFoundError);
      });

      it('returns a post if post exists', async () => {
        const postId = createId();

        postDomain.exists.mockResolvedValueOnce(true);
        postDomain.findById.mockResolvedValueOnce({
          ...postInputMock,
          id: postId,
        });

        const result = await postService.findById({ postId });

        expect(postDomain.exists).toHaveBeenCalledWith({ postId });
        expect(postDomain.findById).toHaveBeenCalledWith({ postId });

        expect(result).toEqual({
          ...postInputMock,
          id: postId,
        });
      });
    });

    describe('update', () => {
      it('throws an error if post does not exist', () => {
        const postId = createId();

        const updatedPost = {
          ...postInputMock,
          title: 'updated',
        };

        postDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await postService.update({ post: updatedPost, postId });

          expect(postDomain.exists).toHaveBeenCalledWith({ postId });
          expect(postDomain.update).not.toHaveBeenCalledWith({
            post: updatedPost,
            postId,
          });
        }).toThrowError(NotFoundError);
      });

      it('returns an updated post if post exists', async () => {
        const postId = createId();

        const updatedPost = {
          ...postInputMock,
          title: 'updated',
        };

        postDomain.exists.mockResolvedValueOnce(true);
        postDomain.update.mockResolvedValueOnce({
          ...updatedPost,
          id: postId,
        });

        const result = await postService.update({ post: updatedPost, postId });

        expect(postDomain.exists).toHaveBeenCalledWith({ postId });
        expect(postDomain.update).toHaveBeenCalledWith({
          post: updatedPost,
          postId,
        });

        expect(result).toEqual({
          ...postInputMock,
          ...updatedPost,
          id: postId,
        });
      });
    });
  });
});
