import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto } from 'core/dto';
import { authGuard } from 'modules/auth/core/guards';

import { commentService } from '../application';

import { commentDto, commentsDto } from './dto';
import { commentInput, partialCommentInput } from './input';
import { commentIdParams, findQueryParams } from './params';

export const commentController = new Elysia({ name: 'comment/controller', prefix: '/comments' })
  .use(authGuard)
  .use(commentService)
  .model({
    commentDto,
    commentIdParams,
    commentInput,
    commentsDto,
    findQueryParams,
    partialCommentInput,
  })
  .get(
    '/',
    ({ commentService, query: { postId, userId } }) => {
      return commentService.find({
        postId,
        userId,
      });
    },
    {
      authenticated: true,
      query: findQueryParams,
      response: commentsDto,
      detail: {
        tags: ['Comments'],
        summary: 'Get all comments',
        description: 'Retrieve a list of comments with optional filtering by post ID or user ID',
        responses: {
          '200': {
            description: 'Successfully retrieved comments',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentsDto',
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
    '/:commentId',
    async ({ params: { commentId }, status, commentService }) => {
      const comment = await commentService.findById({ commentId });

      if (!comment) {
        return status(404, { message: 'Comment not found' });
      }

      return comment;
    },
    {
      authenticated: true,
      params: commentIdParams,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Get comment by ID',
        description: 'Retrieve a specific comment by its unique identifier',
        responses: {
          '200': {
            description: 'Comment found and returned successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
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
            description: 'Comment not found with the given ID',
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
    async ({ body, status, commentService }) => {
      const comment = await commentService.create({ comment: body });

      if (!comment) {
        return status(400, { message: 'Comment cannot be created' });
      }

      return status(201, comment);
    },
    {
      authenticated: true,
      body: commentInput,
      response: {
        201: commentDto,
        400: badRequestErrorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Create new comment',
        description: 'Create a new comment for a post',
        responses: {
          '201': {
            description: 'Comment created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
                },
              },
            },
          },
          '400': {
            description: 'Invalid comment data or comment cannot be created',
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
    '/:commentId',
    async ({ body, params: { commentId }, status, commentService }) => {
      const comment = await commentService.update({
        comment: body,
        commentId,
      });

      if (!comment) {
        return status(404, { message: 'Comment not found' });
      }

      return comment;
    },
    {
      authenticated: true,
      params: commentIdParams,
      body: commentInput,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Update comment',
        description: 'Update all fields of an existing comment',
        responses: {
          '200': {
            description: 'Comment updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
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
            description: 'Comment not found with the given ID',
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
    '/:commentId',
    async ({ body, params: { commentId }, status, commentService }) => {
      const comment = await commentService.update({
        comment: body,
        commentId,
      });

      if (!comment) {
        return status(404, { message: 'Comment not found' });
      }

      return comment;
    },
    {
      authenticated: true,
      params: commentIdParams,
      body: partialCommentInput,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Partially update comment',
        description: 'Update specific fields of an existing comment',
        responses: {
          '200': {
            description: 'Comment updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
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
            description: 'Comment not found with the given ID',
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
    '/:commentId',
    async ({ params: { commentId }, status, commentService }) => {
      const comment = await commentService.delete({ commentId });

      if (!comment) {
        return status(404, { message: 'Comment not found' });
      }

      return comment;
    },
    {
      authenticated: true,
      params: commentIdParams,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Delete comment',
        description: 'Delete an existing comment',
        responses: {
          '200': {
            description: 'Comment deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
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
            description: 'Comment not found with the given ID',
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
