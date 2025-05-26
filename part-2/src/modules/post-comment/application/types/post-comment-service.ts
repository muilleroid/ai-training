import type { Comment } from 'modules/comment/domain/types';

type FindByPostIdParams = {
  postId: string;
};

export type TPostCommentService = {
  findByPostId: (params: FindByPostIdParams) => Promise<Comment[]>;
};
