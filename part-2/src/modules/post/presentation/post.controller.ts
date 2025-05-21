import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto } from 'core/dto';
import { authGuard } from 'modules/auth/core/guards';

import { postService } from '../application';

import { postDto, postsDto } from './dto';
import { partialPostInput, postInput } from './input';
import { findQueryParams, postIdParams } from './params';

export const postController = new Elysia({ name: 'post/controller', prefix: '/posts' })
  .use(authGuard)
  .use(postService)
  .model({
    postDto,
    postsDto,
  })
  .get(
    '/',
    ({ postService, query: { userId } }) => {
      return postService.find({ userId });
    },
    {
      authenticated: true,
      response: postsDto,
      query: findQueryParams,
      detail: {
        tags: ['Posts'],
        summary: 'Get all posts',
        description: 'Retrieve a list of posts with optional filtering by user ID',
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
      params: postIdParams,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Get post by ID',
        description: 'Retrieve a specific post by its unique identifier',
        responses: {
          '200': {
            description: 'Post found and returned successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found with the given ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  )
  .post(
    '/',
    async ({ body, status, postService }) => {
      const post = await postService.create({ post: body });

      if (!post) {
        return status(400, { message: 'Post cannot be created' });
      }

      return status(201, post);
    },
    {
      authenticated: true,
      body: postInput,
      response: {
        201: postDto,
        400: badRequestErrorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Create new post',
        description: 'Create a new post with the provided data',
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
          '400': {
            description: 'Invalid post data or post cannot be created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/badRequestErrorDto',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
      params: postIdParams,
      body: postInput,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Update post',
        description: 'Update all fields of an existing post',
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found with the given ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
      params: postIdParams,
      body: partialPostInput,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Partially update post',
        description: 'Update specific fields of an existing post',
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found with the given ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
      params: postIdParams,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Posts'],
        summary: 'Delete post',
        description: 'Delete an existing post',
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'Post not found with the given ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  );
