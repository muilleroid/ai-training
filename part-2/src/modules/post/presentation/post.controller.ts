import { Elysia } from 'elysia';

import { errorDto } from 'core/dto';

import { postService } from '../application';

import { postDto, postsDto } from './dto';
import { partialPostInput, postInput } from './input';
import { findQueryParams, postIdParams } from './params';

export const postController = new Elysia({ name: 'post/controller', prefix: '/posts' })
  .use(postService)
  .model({
    errorDto,
    postDto,
    postsDto,
  })
  .get(
    '/',
    ({ postService, query: { userId } }) => {
      return postService.find({ userId });
    },
    {
      response: postsDto,
      query: findQueryParams,
      detail: {
        tags: ['Posts'],
        summary: 'Get all posts',
        responses: {
          '200': {
            description: 'Successfully retrieved posts',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postsDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .get(
    '/:postId',
    async ({ params: { postId }, status, postService }) => {
      const post = await postService.findById({ postId });

      if (!post) {
        return status(404, { message: 'Post not found' });
      }

      return post;
    },
    {
      params: postIdParams,
      response: {
        200: postDto,
        404: errorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Get post by ID',
        responses: {
          '200': {
            description: 'Successfully retrieved post',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .post(
    '/',
    async ({ body, status, postService }) => {
      const post = await postService.create({ post: body });

      if (!post) {
        return status(422, { message: 'Post cannot be created' });
      }

      return status(201, post);
    },
    {
      body: postInput,
      response: {
        201: postDto,
        422: errorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Create new post',
        responses: {
          '201': {
            description: 'Post created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
          },
          '422': {
            description: 'Post cannot be created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .put(
    '/:postId',
    async ({ body, params: { postId }, status, postService }) => {
      const post = await postService.update({
        post: body,
        postId,
      });

      if (!post) {
        return status(404, { message: 'Post not found' });
      }

      return post;
    },
    {
      params: postIdParams,
      body: postInput,
      response: {
        200: postDto,
        404: errorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Update post',
        responses: {
          '200': {
            description: 'Post updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .patch(
    '/:postId',
    async ({ body, params: { postId }, status, postService }) => {
      const post = await postService.update({
        post: body,
        postId,
      });

      if (!post) {
        return status(404, { message: 'Post not found' });
      }

      return post;
    },
    {
      params: postIdParams,
      body: partialPostInput,
      response: {
        200: postDto,
        404: errorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Partially update post',
        responses: {
          '200': {
            description: 'Post updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .delete(
    '/:postId',
    async ({ params: { postId }, status, postService }) => {
      const post = await postService.delete({ postId });

      if (!post) {
        return status(404, { message: 'Post not found' });
      }

      return post;
    },
    {
      params: postIdParams,
      response: {
        200: postDto,
        404: errorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Delete post',
        responses: {
          '200': {
            description: 'Post deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  );
