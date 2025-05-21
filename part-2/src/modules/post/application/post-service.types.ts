import type { PostInput } from '../domain/types';

export type CreateParams = {
  post: PostInput;
};

export type DeleteParams = {
  postId: string;
};

export type FindByIdParams = {
  postId: string;
};

export type FindByUserIdParams = {
  userId: string;
};

export type UpdateParams = {
  postId: string;
  post: Partial<PostInput>;
};
