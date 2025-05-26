import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import type { CreatePostInput, TPostRepository } from './types';
import { postDomainFactory } from './post.domain';

const postInputMock: CreatePostInput = {
  body: 'body',
  title: 'title',
  userId: createId(),
};

describe('post', () => {
  describe('PostDomain', () => {
    const postRepository = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TPostRepository;

    const postDomain = postDomainFactory({ postRepository });

    describe('create', () => {
      it('returns a post', async () => {
        postRepository.create.mockResolvedValueOnce({
          ...postInputMock,
          id: createId(),
        });

        const result = await postDomain.create({ post: postInputMock });

        expect(postRepository.create).toHaveBeenCalledWith({ post: postInputMock });

        expect(result).toEqual({
          ...postInputMock,
          id: expect.any(String),
        });
      });
    });

    describe('delete', () => {
      it('returns a post', async () => {
        const postId = createId();

        postRepository.delete.mockResolvedValueOnce({
          ...postInputMock,
          id: postId,
        });

        const result = await postDomain.delete({ postId });

        expect(postRepository.delete).toHaveBeenCalledWith({ postId });

        expect(result).toEqual({
          ...postInputMock,
          id: postId,
        });
      });
    });

    describe('exists', () => {
      it('returns true if post exists', async () => {
        const postId = createId();

        postRepository.exists.mockResolvedValueOnce(true);

        const result = await postDomain.exists({ postId });

        expect(postRepository.exists).toHaveBeenCalledWith({ postId });

        expect(result).toBe(true);
      });

      it('returns false if post does not exist', async () => {
        const postId = createId();

        postRepository.exists.mockResolvedValueOnce(false);

        const result = await postDomain.exists({ postId });

        expect(postRepository.exists).toHaveBeenCalledWith({ postId });

        expect(result).toBe(false);
      });
    });

    describe('find', () => {
      it('returns an array of posts', async () => {
        const posts = [
          { ...postInputMock, id: createId() },
          { ...postInputMock, id: createId() },
        ];

        postRepository.find.mockResolvedValueOnce(posts);

        const result = await postDomain.find();

        expect(postRepository.find).toHaveBeenCalled();

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual(posts);
      });

      it('returns posts filtered by userId', async () => {
        const userId = createId();

        const posts = [
          { ...postInputMock, id: createId(), userId },
          { ...postInputMock, id: createId(), userId },
        ];

        postRepository.find.mockResolvedValueOnce(posts);

        const result = await postDomain.find({ userId });

        expect(postRepository.find).toHaveBeenCalledWith({ userId });

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(posts);
      });
    });

    describe('findById', () => {
      it('returns a post by id', async () => {
        const postId = createId();

        postRepository.findById.mockResolvedValueOnce({
          ...postInputMock,
          id: postId,
        });

        const result = await postDomain.findById({ postId });

        expect(postRepository.findById).toHaveBeenCalledWith({ postId });

        expect(result).toEqual({
          ...postInputMock,
          id: postId,
        });
      });
    });

    describe('update', () => {
      it('returns an updated post', async () => {
        const postId = createId();

        const updatedPost = {
          ...postInputMock,
          title: 'updated',
        };

        postRepository.update.mockResolvedValueOnce({
          ...updatedPost,
          id: postId,
        });

        const result = await postDomain.update({
          post: updatedPost,
          postId,
        });

        expect(postRepository.update).toHaveBeenCalledWith({
          post: updatedPost,
          postId,
        });

        expect(result).toEqual({
          ...updatedPost,
          id: postId,
        });
      });
    });
  });
});
