import type { CreateCommentInput, Comment, UpdateCommentInput } from '../../domain/types';

type CreateParams = {
  comment: CreateCommentInput;
};

type DeleteParams = {
  commentId: string;
};

type FindParams = {
  postId?: string;
  userId?: string;
};

type FindByIdParams = {
  commentId: string;
};

type UpdateParams = {
  comment: Partial<UpdateCommentInput>;
  commentId: string;
};

export type TCommentService = {
  create: (params: CreateParams) => Promise<Comment>;
  delete: (params: DeleteParams) => Promise<Comment>;
  find: (params?: FindParams) => Promise<Comment[]>;
  findById: (params: FindByIdParams) => Promise<Comment>;
  update: (params: UpdateParams) => Promise<Comment>;
};
