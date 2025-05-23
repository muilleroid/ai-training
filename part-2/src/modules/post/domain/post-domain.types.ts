import type { CreatePostInput, UpdatePostInput } from './types';

export type CreateParams = {
  post: CreatePostInput;
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
  post: Partial<UpdatePostInput>;
  postId: string;
};
