import { Elysia } from 'elysia';

import { CommentDomain } from 'modules/comment/domain';

import type { FindByPostIdParams } from './post-comment-service.types';

export const PostCommentService = new Elysia({ name: 'post-comment/service' })
  .use(CommentDomain)
  .derive({ as: 'global' }, function derivePostCommentService({ commentDomain }) {
    const postCommentsService = {
      findByPostId: ({ postId }: FindByPostIdParams) => {
        return commentDomain.find({
          postId,
        });
      },
    };

    return { postCommentsService };
  });
