import type { Post } from './post';
import type { PostInput } from './post-input';

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

export type TPostRepository = {
  create: (params: CreateParams) => Promise<Post | null>;
  delete: (params: DeleteParams) => Promise<Post | null>;
  find: (params: FindParams) => Promise<Post[]>;
  findById: (params: FindByIdParams) => Promise<Post | null>;
  update: (params: UpdateParams) => Promise<Post | null>;
};
