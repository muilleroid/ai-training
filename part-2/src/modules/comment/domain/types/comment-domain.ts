import type { CreateCommentInput } from './create-comment-input';
import type { Comment } from './comment';
import type { UpdateCommentInput } from './update-comment-input';

type CreateParams = {
  comment: CreateCommentInput;
};

type DeleteParams = {
  commentId: string;
};

type ExistsParams = {
  commentId: string;
};

type FindByIdParams = {
  commentId: string;
};

type FindParams = {
  postId?: string;
  userId?: string;
};

type UpdateParams = {
  comment: Partial<UpdateCommentInput>;
  commentId: string;
};

export type TCommentDomain = {
  create: (params: CreateParams) => Promise<Comment | null>;
  delete: (params: DeleteParams) => Promise<Comment | null>;
  exists: (params: ExistsParams) => Promise<boolean>;
  find: (params?: FindParams) => Promise<Comment[]>;
  findById: (params: FindByIdParams) => Promise<Comment | null>;
  update: (params: UpdateParams) => Promise<Comment | null>;
};
