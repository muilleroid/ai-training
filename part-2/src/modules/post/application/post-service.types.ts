import type { PostInput } from '../domain/types';

export type CreateParams = {
  post: PostInput;
};

export type DeleteParams = {
  postId: string;
};

export type FindParams = {
  userId?: string;
};

export type FindByIdParams = {
  postId: string;
};

export type UpdateParams = {
  post: Partial<PostInput>;
  postId: string;
};
