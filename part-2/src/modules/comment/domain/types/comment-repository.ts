import type { CreateCommentInput } from './create-comment-input';
import type { Comment } from './comment';
import type { UpdateCommentInput } from './update-comment-input';

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

export type TCommentRepository = {
  create: (params: CreateParams) => Promise<Comment | null>;
  delete: (params: DeleteParams) => Promise<Comment | null>;
  find: (params: FindParams) => Promise<Comment[]>;
  findById: (params: FindByIdParams) => Promise<Comment | null>;
  update: (params: UpdateParams) => Promise<Comment | null>;
};
