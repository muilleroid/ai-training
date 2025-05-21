import { Elysia } from 'elysia';

import { errorDto } from 'core/dto';
import { authGuard } from 'modules/auth/core/guards';

import { commentService } from '../application';

import { commentDto, commentsDto } from './dto';
import { commentInput, partialCommentInput } from './input';
import { commentIdParams, findQueryParams } from './params';

export const commentController = new Elysia({ name: 'comment/controller', prefix: '/comments' })
  .use(authGuard)
  .use(commentService)
  .model({
    errorDto,
    commentDto,
    commentsDto,
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
                  $ref: '#/components/schemas/errorDto',
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
        404: errorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Get comment by ID',
        responses: {
          '200': {
            description: 'Successfully retrieved comment',
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
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
          '404': {
            description: 'Comment not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
        400: errorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Create new comment',
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
            description: 'Comment cannot be created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
        404: errorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Update comment',
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
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
          '404': {
            description: 'Comment not found',
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
      security: [
        {
          bearerAuth: [],
        },
      ],
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
        404: errorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Partially update comment',
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
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
          '404': {
            description: 'Comment not found',
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
      security: [
        {
          bearerAuth: [],
        },
      ],
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
        404: errorDto,
      },
      detail: {
        tags: ['Comments'],
        summary: 'Delete comment',
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
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
          '404': {
            description: 'Comment not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
