import { Elysia } from 'elysia';

import { AuthGuard } from 'modules/auth/application';

import { PostService } from '../application';

import { PostDto, PostsDto } from './dto';
import { CreatePostInput, PartialUpdatePostInput, UpdatePostInput } from './input';
import { FindPostsQueryParams, PostIdUrlParams } from './params';

export const PostController = new Elysia({ name: 'post/controller', prefix: '/posts' })
  .use(AuthGuard)
  .use(PostService)
  .model({
    CreatePostInput,
    FindPostsQueryParams,
    PartialUpdatePostInput,
    PostDto,
    PostIdUrlParams,
    PostsDto,
    UpdatePostInput,
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
    ({ params: { postId }, postService }) => {
      return postService.findById({ postId });
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
      response: PostDto,
    },
  )
  .post(
    '/',
    async ({ body, postService, status }) => {
      const post = await postService.create({ post: body });

      return status(201, post);
    },
    {
      authenticated: true,
      body: CreatePostInput,
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
          '409': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ConflictErrorDto',
                },
              },
            },
            description: 'Conflict',
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
      },
    },
  )
  .put(
    '/:postId',
    ({ body, params: { postId }, postService }) => {
      return postService.update({
        post: body,
        postId,
      });
    },
    {
      authenticated: true,
      body: UpdatePostInput,
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
      response: PostDto,
    },
  )
  .patch(
    '/:postId',
    async ({ body, params: { postId }, postService }) => {
      return postService.update({
        post: body,
        postId,
      });
    },
    {
      authenticated: true,
      body: PartialUpdatePostInput,
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
      response: PostDto,
    },
  )
  .delete(
    '/:postId',
    ({ params: { postId }, postService }) => {
      return postService.delete({ postId });
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
      response: PostDto,
    },
  );
