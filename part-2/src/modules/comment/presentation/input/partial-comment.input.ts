import { t } from 'elysia';

import { CommentInput } from './comment.input';

export const PartialCommentInput = t.Partial(CommentInput, {
  description: 'Input data for updating an existing comment. All fields are optional.',
  title: 'Partial Comment Input',
});
