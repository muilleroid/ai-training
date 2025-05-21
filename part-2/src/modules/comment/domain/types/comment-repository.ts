import type { CommentInput } from './comment-input';
import type { Comment } from './comment';

export type CreateParams = {
  comment: CommentInput;
};

export type DeleteParams = {
  commentId: string;
};

export type FindByIdParams = {
  commentId: string;
};

export type FindByPostIdParams = {
  postId: string;
};

export type FindByUserIdParams = {
  userId: string;
};

export type UpdateParams = {
  commentId: string;
  comment: Partial<CommentInput>;
};

export type CommentRepository = {
  create: (params: CreateParams) => Promise<Comment | null>;
  delete: (params: DeleteParams) => Promise<Comment | null>;
  find: () => Promise<Comment[]>;
  findById: (params: FindByIdParams) => Promise<Comment | null>;
  findByPostId: (params: FindByPostIdParams) => Promise<Comment[]>;
  findByUserId: (params: FindByUserIdParams) => Promise<Comment[]>;
  update: (params: UpdateParams) => Promise<Comment | null>;
};
