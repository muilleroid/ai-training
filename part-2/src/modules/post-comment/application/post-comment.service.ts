import { Elysia } from 'elysia';

import { commentDomain } from 'modules/comment/domain';

import type { FindByPostIdParams } from './post-comment-service.types';

export const postCommentService = new Elysia({ name: 'post-comment/service' })
  .use(commentDomain)
  .resolve({ as: 'global' }, ({ commentDomain }) => {
    const service = {
      findByPostId: ({ postId }: FindByPostIdParams) => {
        return commentDomain.find({
          postId,
        });
      },
    };

    return { postCommentsService: service };
  });
