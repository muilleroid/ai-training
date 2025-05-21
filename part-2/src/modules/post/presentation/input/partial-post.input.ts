import { t } from 'elysia';

import { postInput } from './post.input';

export const partialPostInput = t.Partial(postInput, {
  description: 'Input data for updating an existing post. All fields are optional.',
  title: 'Partial Post Input',
});

export type PartialPostInput = typeof partialPostInput.static;
