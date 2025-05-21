import { t } from 'elysia';

import { postInput } from './post.input';

export const partialPostInput = t.Partial(postInput);

export type PartialPostInput = typeof partialPostInput.static;
