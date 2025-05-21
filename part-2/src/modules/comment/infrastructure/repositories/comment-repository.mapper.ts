import type { Comment } from 'modules/comment/domain/types';

import type { CommentSchema } from '../schemas';

export const toComment = (comment?: CommentSchema | null): Comment | null => {
  if (!comment) {
    return null;
  }

  return {
    body: comment.body,
    id: comment.id,
    postId: comment.postId,
    userId: comment.userId,
  };
};

export const toCommentList = (comments: CommentSchema[]): Comment[] => {
  return comments.map(toComment).filter(Boolean);
};
