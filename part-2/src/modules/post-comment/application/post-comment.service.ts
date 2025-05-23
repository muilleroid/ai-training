import { Elysia, NotFoundError } from 'elysia';

import { CommentDomain } from 'modules/comment/domain';
import { PostDomain } from 'modules/post/domain';

import type { FindByPostIdParams } from './post-comment-service.types';

export const PostCommentService = new Elysia({ name: 'post-comment/service' })
  .use(CommentDomain)
  .use(PostDomain)
  .derive({ as: 'global' }, function derivePostCommentService({ commentDomain, postDomain }) {
    const postCommentsService = {
      findByPostId: async ({ postId }: FindByPostIdParams) => {
        const exists = await postDomain.exists({ postId });

        if (!exists) {
          throw new NotFoundError('Post not found');
        }

        return commentDomain.find({
          postId,
        });
      },
    };

    return { postCommentsService };
  });
