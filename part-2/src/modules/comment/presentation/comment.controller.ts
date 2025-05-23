import { Elysia } from 'elysia';

import { AuthGuard } from 'modules/auth/application';

import { CommentService } from '../application';

import { CommentDto, CommentsDto } from './dto';
import { CreateCommentInput, UpdateCommentInput } from './input';
import { CommentIdUrlParams, FindCommentsQueryParams } from './params';

export const CommentController = new Elysia({ name: 'comment/controller', prefix: '/comments' })
  .use(AuthGuard)
  .use(CommentService)
  .model({
    CommentDto,
    CommentIdUrlParams,
    CommentsDto,
    CreateCommentInput,
    FindCommentsQueryParams,
    UpdateCommentInput,
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
                  $ref: '#/components/schemas/CommentsDto',
                },
              },
            },
            description: 'Successfully retrieved comments',
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
        summary: 'Get all comments',
        tags: ['Comments'],
      },
      query: FindCommentsQueryParams,
      response: CommentsDto,
    },
  )
  .get(
    '/:commentId',
    ({ commentService, params: { commentId } }) => {
      return commentService.findById({ commentId });
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
                  $ref: '#/components/schemas/CommentDto',
                },
              },
            },
            description: 'Comment found and returned successfully',
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
      params: CommentIdUrlParams,
      response: CommentDto,
    },
  )
  .post(
    '/',
    async ({ body, commentService, status }) => {
      const comment = await commentService.create({ comment: body });

      return status(201, comment);
    },
    {
      authenticated: true,
      body: CreateCommentInput,
      detail: {
        description: 'Create a new comment for a post',
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommentDto',
                },
              },
            },
            description: 'Comment created successfully',
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
        summary: 'Create new comment',
        tags: ['Comments'],
      },
      response: {
        201: CommentDto,
      },
    },
  )
  .put(
    '/:commentId',
    ({ body, commentService, params: { commentId } }) => {
      return commentService.update({
        comment: body,
        commentId,
      });
    },
    {
      authenticated: true,
      body: UpdateCommentInput,
      detail: {
        description: 'Update all fields of an existing comment',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommentDto',
                },
              },
            },
            description: 'Comment updated successfully',
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
      params: CommentIdUrlParams,
      response: CommentDto,
    },
  )
  .patch(
    '/:commentId',
    ({ body, commentService, params: { commentId } }) => {
      return commentService.update({
        comment: body,
        commentId,
      });
    },
    {
      authenticated: true,
      body: UpdateCommentInput,
      detail: {
        description: 'Update specific fields of an existing comment',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommentDto',
                },
              },
            },
            description: 'Comment updated successfully',
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
      params: CommentIdUrlParams,
      response: CommentDto,
    },
  )
  .delete(
    '/:commentId',
    ({ commentService, params: { commentId } }) => {
      return commentService.delete({ commentId });
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
                  $ref: '#/components/schemas/CommentDto',
                },
              },
            },
            description: 'Comment deleted successfully',
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
      params: CommentIdUrlParams,
      response: CommentDto,
    },
  );
