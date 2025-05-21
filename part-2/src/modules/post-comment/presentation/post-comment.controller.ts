import { Elysia } from 'elysia';

import { AuthGuard } from 'modules/auth/core/guards';
import { commentsDto } from 'modules/comment/presentation/dto';
import { postIdParams } from 'modules/post/presentation/params';

import { PostCommentService } from '../application/post-comment.service';

export const PostCommentController = new Elysia({ name: 'post-comment/controller', prefix: '/posts' })
  .use(AuthGuard)
  .use(PostCommentService)
  .get(
    '/:postId/comments',
    ({ params: { postId }, postCommentsService }) => {
      return postCommentsService.findByPostId({ postId });
    },
    {
      authenticated: true,
      detail: {
        description: 'Retrieve all comments associated with a specific post',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/commentsDto',
                },
              },
            },
            description: 'Successfully retrieved comments for the post',
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
        summary: 'Get all comments for a post',
        tags: ['Posts', 'Comments'],
      },
      params: postIdParams,
      response: commentsDto,
    },
  );
