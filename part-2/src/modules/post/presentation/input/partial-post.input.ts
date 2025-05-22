import { t } from 'elysia';

import { PostInput } from './post.input';

export const PartialPostInput = t.Partial(PostInput, {
  description: 'Input data for updating an existing post. All fields are optional.',
  title: 'Partial Post Input',
});
