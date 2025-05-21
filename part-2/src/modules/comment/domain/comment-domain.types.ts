import type { CommentInput } from './types';

export type CreateParams = {
  comment: CommentInput;
};

export type DeleteParams = {
  commentId: string;
};

export type FindByIdParams = {
  commentId: string;
};

export type FindByPostIdParams = {
  postId: string;
};

export type FindByUserIdParams = {
  userId: string;
};

export type UpdateParams = {
  commentId: string;
  comment: Partial<CommentInput>;
};
