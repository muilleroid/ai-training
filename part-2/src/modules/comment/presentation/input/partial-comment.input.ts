import { t } from 'elysia';

import { commentInput } from './comment.input';

export const partialCommentInput = t.Partial(commentInput);

export type PartialCommentInput = typeof partialCommentInput.static;
