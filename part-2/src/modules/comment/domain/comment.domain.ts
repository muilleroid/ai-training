import { Elysia } from 'elysia';

import { CommentRepository } from '../infrastructure/repositories';

import type { TCommentDomain, TCommentRepository } from './types';

type CommentDomainFactoryParams = {
  commentRepository: TCommentRepository;
};

export const commentDomainFactory = ({ commentRepository }: CommentDomainFactoryParams) => {
  const commentDomain: TCommentDomain = {
    create: ({ comment }) => {
      return commentRepository.create({ comment });
    },
    delete: ({ commentId }) => {
      return commentRepository.delete({ commentId });
    },
    exists: ({ commentId }) => {
      return commentRepository.exists({ commentId });
    },
    find: ({ postId, userId } = {}) => {
      return commentRepository.find({
        postId,
        userId,
      });
    },
    findById: ({ commentId }) => {
      return commentRepository.findById({ commentId });
    },
    update: ({ comment, commentId }) => {
      return commentRepository.update({
        comment,
        commentId,
      });
    },
  };

  return commentDomain;
};

export const CommentDomain = new Elysia({ name: 'comment/domain' })
  .use(CommentRepository)
  .derive({ as: 'global' }, function deriveCommentDomain({ commentRepository }) {
    const commentDomain = commentDomainFactory({ commentRepository });

    return { commentDomain };
  });
