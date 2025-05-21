import { Elysia } from 'elysia';

import { authGuard } from 'modules/auth/core/guards';
import { commentsDto } from 'modules/comment/presentation/dto';
import { postIdParams } from 'modules/post/presentation/params';

import { postCommentService } from '../application/post-comment.service';

export const postCommentController = new Elysia({ name: 'post-comment/controller', prefix: '/posts' })
  .use(authGuard)
  .use(postCommentService)
  .get(
    '/:postId/comments',
    ({ params: { postId }, postCommentsService }) => {
      return postCommentsService.findByPostId({ postId });
    },
    {
      authenticated: true,
      params: postIdParams,
      response: commentsDto,
      detail: {
        tags: ['Posts', 'Comments'],
        summary: 'Get all comments for a post',
        description: 'Retrieve all comments associated with a specific post',
        responses: {
          '200': {
            description: 'Successfully retrieved comments for the post',
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
  );
