import { t } from 'elysia';

import { commentInput } from './comment.input';

export const partialCommentInput = t.Partial(commentInput, {
  description: 'Input data for updating an existing comment. All fields are optional.',
  title: 'Partial Comment Input',
});

export type PartialCommentInput = typeof partialCommentInput.static;
