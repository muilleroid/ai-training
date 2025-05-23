import { t } from 'elysia';

export const UpdateCommentInput = t.Object(
  {
    body: t.String({
      description: 'The content of the comment',
      example: 'This is a great post!',
      minLength: 1,
    }),
  },
  {
    description: 'Input data for updating a new comment',
    title: 'Update Comment Input',
  },
);
