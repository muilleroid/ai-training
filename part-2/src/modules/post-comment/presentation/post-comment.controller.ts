import { Elysia } from 'elysia';

import { commentsDto } from 'modules/comment/presentation/dto';
import { postIdParams } from 'modules/post/presentation/params';

import { postCommentService } from '../application/post-comment.service';

export const postCommentController = new Elysia({ name: 'post-comment/controller', prefix: '/posts' })
  .use(postCommentService)
  .model({
    commentsDto,
  })
  .get(
    '/:postId/comments',
    ({ params: { postId }, postCommentsService }) => {
      return postCommentsService.findByPostId({ postId });
    },
    {
      params: postIdParams,
      response: commentsDto,
      detail: {
        tags: ['Posts'],
        summary: 'Get all comments for a post',
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
        },
      },
    },
  );
