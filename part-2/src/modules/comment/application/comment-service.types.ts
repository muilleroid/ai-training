import type { CreateCommentInput, UpdateCommentInput } from '../domain/types';

export type CreateParams = {
  comment: CreateCommentInput;
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
  comment: Partial<UpdateCommentInput>;
  commentId: string;
};
