import type { CommentInput } from './types';

export type CreateParams = {
  comment: CommentInput;
};

export type DeleteParams = {
  commentId: string;
};

export type FindParams = {
  postId?: string;
  userId?: string;
};

export type FindByIdParams = {
  commentId: string;
};

export type UpdateParams = {
  comment: Partial<CommentInput>;
  commentId: string;
};
