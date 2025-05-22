import { Elysia } from 'elysia';

import { BadRequestErrorDto, NotFoundErrorDto } from 'core/presentation/dto';
import { AuthGuard } from 'modules/auth/application';

import { PostService } from '../application';

import { PostDto, PostsDto } from './dto';
import { PartialPostInput, PostInput } from './input';
import { FindPostsQueryParams, PostIdUrlParams } from './params';

export const PostController = new Elysia({ name: 'post/controller', prefix: '/posts' })
  .use(AuthGuard)
  .use(PostService)
  .model({
    FindPostsQueryParams,
    PartialPostInput,
    PostDto,
    PostIdUrlParams,
    PostInput,
    PostsDto,
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
                  $ref: '#/components/schemas/PostsDto',
                },
              },
            },
            description: 'Successfully retrieved posts',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
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
      query: FindPostsQueryParams,
      response: PostsDto,
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
                  $ref: '#/components/schemas/PostDto',
                },
              },
            },
            description: 'Post found and returned successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: PostIdUrlParams,
      response: {
        200: PostDto,
        404: NotFoundErrorDto,
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
      body: PostInput,
      detail: {
        description: 'Create a new post with the provided data',
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PostDto',
                },
              },
            },
            description: 'Post created successfully',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequestErrorDto',
                },
              },
            },
            description: 'Invalid post data or post cannot be created',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
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
        201: PostDto,
        400: BadRequestErrorDto,
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
      body: PostInput,
      detail: {
        description: 'Update all fields of an existing post',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PostDto',
                },
              },
            },
            description: 'Post updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: PostIdUrlParams,
      response: {
        200: PostDto,
        404: NotFoundErrorDto,
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
      body: PartialPostInput,
      detail: {
        description: 'Update specific fields of an existing post',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PostDto',
                },
              },
            },
            description: 'Post updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: PostIdUrlParams,
      response: {
        200: PostDto,
        404: NotFoundErrorDto,
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
                  $ref: '#/components/schemas/PostDto',
                },
              },
            },
            description: 'Post deleted successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: PostIdUrlParams,
      response: {
        200: PostDto,
        404: NotFoundErrorDto,
      },
    },
  );
