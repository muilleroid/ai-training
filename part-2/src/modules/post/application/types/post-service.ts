import type { CreatePostInput, Post, UpdatePostInput } from '../../domain/types';

type CreateParams = {
  post: CreatePostInput;
};

type DeleteParams = {
  postId: string;
};

type FindParams = {
  userId?: string;
};

type FindByIdParams = {
  postId: string;
};

type UpdateParams = {
  post: Partial<UpdatePostInput>;
  postId: string;
};

export type TPostService = {
  create: (params: CreateParams) => Promise<Post>;
  delete: (params: DeleteParams) => Promise<Post>;
  find: (params?: FindParams) => Promise<Post[]>;
  findById: (params: FindByIdParams) => Promise<Post>;
  update: (params: UpdateParams) => Promise<Post>;
};
