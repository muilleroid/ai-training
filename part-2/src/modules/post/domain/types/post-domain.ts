import type { CreatePostInput } from './create-post-input';
import type { Post } from './post';
import type { UpdatePostInput } from './update-post-input';

type CreateParams = {
  post: CreatePostInput;
};

type DeleteParams = {
  postId: string;
};

type ExistsParams = {
  postId: string;
};

type FindByIdParams = {
  postId: string;
};

type FindParams = {
  userId?: string;
};

type UpdateParams = {
  post: Partial<UpdatePostInput>;
  postId: string;
};

export type TPostDomain = {
  create: (params: CreateParams) => Promise<Post | null>;
  delete: (params: DeleteParams) => Promise<Post | null>;
  exists: (params: ExistsParams) => Promise<boolean>;
  find: (params?: FindParams) => Promise<Post[]>;
  findById: (params: FindByIdParams) => Promise<Post | null>;
  update: (params: UpdateParams) => Promise<Post | null>;
};
