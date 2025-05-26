import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';
import { CommentDomain } from 'modules/comment/domain';
import type { TCommentDomain } from 'modules/comment/domain/types';
import { PostDomain } from 'modules/post/domain';
import type { TPostDomain } from 'modules/post/domain/types';

import type { TPostCommentService } from './types';

type PostCommentServiceFactoryParams = {
  commentDomain: TCommentDomain;
  postDomain: TPostDomain;
};

export const postCommentServiceFactory = ({ commentDomain, postDomain }: PostCommentServiceFactoryParams) => {
  const postCommentsService: TPostCommentService = {
    findByPostId: async ({ postId }) => {
      const exists = await postDomain.exists({ postId });

      if (!exists) {
        throw new NotFoundError('Post not found');
      }

      return commentDomain.find({
        postId,
      });
    },
  };

  return postCommentsService;
};

export const PostCommentService = new Elysia({ name: 'post-comment/service' })
  .use(CommentDomain)
  .use(PostDomain)
  .derive({ as: 'global' }, function derivePostCommentService({ commentDomain, postDomain }) {
    const postCommentsService = postCommentServiceFactory({
      commentDomain,
      postDomain,
    });

    return { postCommentsService };
  });
