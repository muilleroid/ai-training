import { t } from 'elysia';

import { commentInput } from './comment.input';

export const partialCommentInput = t.Partial(commentInput, {
  title: 'Partial Comment Input',
  description: 'Input data for updating an existing comment. All fields are optional.',
});

export type PartialCommentInput = typeof partialCommentInput.static;
