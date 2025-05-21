import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto } from 'core/dto';
import { AuthGuard } from 'modules/auth/core/guards';

import { PostService } from '../application';

import { postDto, postsDto } from './dto';
import { partialPostInput, postInput } from './input';
import { findQueryParams, postIdParams } from './params';

export const PostController = new Elysia({ name: 'post/controller', prefix: '/posts' })
  .use(AuthGuard)
  .use(PostService)
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
      detail: {
        description: 'Retrieve a list of posts with optional filtering by user ID',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postsDto',
                },
              },
            },
            description: 'Successfully retrieved posts',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get all posts',
        tags: ['Posts'],
      },
      query: findQueryParams,
      response: postsDto,
    },
  )
  .get(
    '/:postId',
    async ({ params: { postId }, postService, status }) => {
      const post = await postService.findById({ postId });

      if (!post) {
        return status(404, { message: 'Post not found' });
      }

      return post;
    },
    {
      authenticated: true,
      detail: {
        description: 'Retrieve a specific post by its unique identifier',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
            description: 'Post found and returned successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'Post not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get post by ID',
        tags: ['Posts'],
      },
      params: postIdParams,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
    },
  )
  .post(
    '/',
    async ({ body, postService, status }) => {
      const post = await postService.create({ post: body });

      if (!post) {
        return status(400, { message: 'Post cannot be created' });
      }

      return status(201, post);
    },
    {
      authenticated: true,
      body: postInput,
      detail: {
        description: 'Create a new post with the provided data',
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
            description: 'Post created successfully',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/badRequestErrorDto',
                },
              },
            },
            description: 'Invalid post data or post cannot be created',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Create new post',
        tags: ['Posts'],
      },
      response: {
        201: postDto,
        400: badRequestErrorDto,
      },
    },
  )
  .put(
    '/:postId',
    async ({ body, params: { postId }, postService, status }) => {
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
      body: postInput,
      detail: {
        description: 'Update all fields of an existing post',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
            description: 'Post updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'Post not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Update post',
        tags: ['Posts'],
      },
      params: postIdParams,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
    },
  )
  .patch(
    '/:postId',
    async ({ body, params: { postId }, postService, status }) => {
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
      body: partialPostInput,
      detail: {
        description: 'Update specific fields of an existing post',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
            description: 'Post updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'Post not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Partially update post',
        tags: ['Posts'],
      },
      params: postIdParams,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
    },
  )
  .delete(
    '/:postId',
    async ({ params: { postId }, postService, status }) => {
      const post = await postService.delete({ postId });

      if (!post) {
        return status(404, { message: 'Post not found' });
      }

      return post;
    },
    {
      authenticated: true,
      detail: {
        description: 'Delete an existing post',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postDto',
                },
              },
            },
            description: 'Post deleted successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'Post not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Delete post',
        tags: ['Posts'],
      },
      params: postIdParams,
      response: {
        200: postDto,
        404: notFoundErrorDto,
      },
    },
  );
