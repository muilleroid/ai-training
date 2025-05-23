import { Elysia } from 'elysia';

import { CommentRepository } from '../infrastructure/repositories';

import type {
  CreateParams,
  DeleteParams,
  ExistsParams,
  FindByIdParams,
  FindParams,
  UpdateParams,
} from './comment-domain.types';

export const CommentDomain = new Elysia({ name: 'comment/domain' })
  .use(CommentRepository)
  .derive({ as: 'global' }, function deriveCommentDomain({ commentRepository }) {
    const commentDomain = {
      create: ({ comment }: CreateParams) => {
        return commentRepository.create({ comment });
      },
      delete: ({ commentId }: DeleteParams) => {
        return commentRepository.delete({ commentId });
      },
      exists: ({ commentId }: ExistsParams) => {
        return commentRepository.exists({ commentId });
      },
      find: ({ postId, userId }: FindParams = {}) => {
        return commentRepository.find({
          postId,
          userId,
        });
      },
      findById: ({ commentId }: FindByIdParams) => {
        return commentRepository.findById({ commentId });
      },
      update: ({ comment, commentId }: UpdateParams) => {
        return commentRepository.update({
          comment,
          commentId,
        });
      },
    };

    return { commentDomain };
  });
