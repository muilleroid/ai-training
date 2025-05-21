import { t } from 'elysia';

import { postInput } from './post.input';

export const partialPostInput = t.Partial(postInput, {
  title: 'Partial Post Input',
  description: 'Input data for updating an existing post. All fields are optional.',
});

export type PartialPostInput = typeof partialPostInput.static;
