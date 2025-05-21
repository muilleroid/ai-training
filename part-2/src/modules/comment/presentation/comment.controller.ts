import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto } from 'core/dto';
import { AuthGuard } from 'modules/auth/core/guards';

import { CommentService } from '../application';

import { commentDto, commentsDto } from './dto';
import { commentInput, partialCommentInput } from './input';
import { commentIdParams, findQueryParams } from './params';

export const CommentController = new Elysia({ name: 'comment/controller', prefix: '/comments' })
  .use(AuthGuard)
  .use(CommentService)
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
      detail: {
        description: 'Retrieve a list of comments with optional filtering by post ID or user ID',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentsDto',
                },
              },
            },
            description: 'Successfully retrieved comments',
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
        summary: 'Get all comments',
        tags: ['Comments'],
      },
      query: findQueryParams,
      response: commentsDto,
    },
  )
  .get(
    '/:commentId',
    async ({ commentService, params: { commentId }, status }) => {
      const comment = await commentService.findById({ commentId });

      if (!comment) {
        return status(404, { message: 'Comment not found' });
      }

      return comment;
    },
    {
      authenticated: true,
      detail: {
        description: 'Retrieve a specific comment by its unique identifier',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
                },
              },
            },
            description: 'Comment found and returned successfully',
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
            description: 'Comment not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get comment by ID',
        tags: ['Comments'],
      },
      params: commentIdParams,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
    },
  )
  .post(
    '/',
    async ({ body, commentService, status }) => {
      const comment = await commentService.create({ comment: body });

      if (!comment) {
        return status(400, { message: 'Comment cannot be created' });
      }

      return status(201, comment);
    },
    {
      authenticated: true,
      body: commentInput,
      detail: {
        description: 'Create a new comment for a post',
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
                },
              },
            },
            description: 'Comment created successfully',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/badRequestErrorDto',
                },
              },
            },
            description: 'Invalid comment data or comment cannot be created',
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
        summary: 'Create new comment',
        tags: ['Comments'],
      },
      response: {
        201: commentDto,
        400: badRequestErrorDto,
      },
    },
  )
  .put(
    '/:commentId',
    async ({ body, commentService, params: { commentId }, status }) => {
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
      body: commentInput,
      detail: {
        description: 'Update all fields of an existing comment',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
                },
              },
            },
            description: 'Comment updated successfully',
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
            description: 'Comment not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Update comment',
        tags: ['Comments'],
      },
      params: commentIdParams,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
    },
  )
  .patch(
    '/:commentId',
    async ({ body, commentService, params: { commentId }, status }) => {
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
      body: partialCommentInput,
      detail: {
        description: 'Update specific fields of an existing comment',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
                },
              },
            },
            description: 'Comment updated successfully',
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
            description: 'Comment not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Partially update comment',
        tags: ['Comments'],
      },
      params: commentIdParams,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
    },
  )
  .delete(
    '/:commentId',
    async ({ commentService, params: { commentId }, status }) => {
      const comment = await commentService.delete({ commentId });

      if (!comment) {
        return status(404, { message: 'Comment not found' });
      }

      return comment;
    },
    {
      authenticated: true,
      detail: {
        description: 'Delete an existing comment',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentDto',
                },
              },
            },
            description: 'Comment deleted successfully',
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
            description: 'Comment not found with the given ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Delete comment',
        tags: ['Comments'],
      },
      params: commentIdParams,
      response: {
        200: commentDto,
        404: notFoundErrorDto,
      },
    },
  );
