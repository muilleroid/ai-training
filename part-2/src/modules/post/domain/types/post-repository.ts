import type { Post } from './post';
import type { CreatePostInput } from './create-post-input';
import type { UpdatePostInput } from './update-post-input';

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

export type ExistsParams = {
  postId: string;
};

export type UpdateParams = {
  post: Partial<UpdatePostInput>;
  postId: string;
};

export type TPostRepository = {
  create: (params: CreateParams) => Promise<Post | null>;
  delete: (params: DeleteParams) => Promise<Post | null>;
  exists: (params: ExistsParams) => Promise<boolean>;
  find: (params: FindParams) => Promise<Post[]>;
  findById: (params: FindByIdParams) => Promise<Post | null>;
  update: (params: UpdateParams) => Promise<Post | null>;
};
